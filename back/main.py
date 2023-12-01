import flask
import psycopg2
import json
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask import request, jsonify, g
import base64

import logging

logging.basicConfig(level=logging.DEBUG)

app = flask.Flask(__name__)
CORS(app, origins='*')


# Connexion to the database
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        # Establish a new connection if none exists
        g._database = db = psycopg2.connect(database="admin_db",
                                            host="postgres",
                                            user="admin",
                                            password="admin",
                                            port="5432")
    return db


def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


app.teardown_appcontext(close_db)


# Middleware function for Basic Authentication
def basic_auth_middleware():
    auth_header = request.headers.get('Authorization')

    db = get_db()
    cursor = db.cursor()

    if auth_header and auth_header.startswith('Basic '):
        encoded_credentials = auth_header[len('Basic '):]
        decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8')
        username, password = decoded_credentials.split(':', 1)

        # Validate credentials against the database
        cursor.execute("SELECT users_id, password FROM users WHERE login = %s", (username,))
        result = cursor.fetchone()

        if result and check_password_hash(result[1], password):
            g.user = {"user_id": result[0], "login": username}
            return None  # Authentication successful, continue to the endpoint handler

    cursor.close()

    # Unauthorized if credentials are missing or invalid
    return jsonify({"message": "Invalid credentials"}), 401


# Register the middleware
@app.before_request
def before_request():
    # Exclude the '/' and '/signup' endpoints from the middleware
    if request.endpoint in ['restaurants_list', 'signup', 'type_food_choose']:
        return None
    if request.method == "OPTIONS":
        return None

    # Execute the authentication middleware for other endpoints
    auth_result = basic_auth_middleware()

    # If the middleware returns a response, return it immediately
    if auth_result:
        return auth_result

@app.route('/food/choose', methods=["GET"])
def type_food_choose():
    db = get_db()
    cursor = db.cursor()

    query = '''
    SELECT type, category FROM type_food ORDER BY RANDOM() LIMIT 1;
    '''
    cursor.execute(query)
    rows = cursor.fetchall()

    # Close the cursor, as you're done with it
    cursor.close()
    data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]

    return jsonify(data)

@app.route('/restaurants', methods=["GET"])
def restaurants_list():
    db = get_db()
    cursor = db.cursor()

    query = '''
    SELECT DISTINCT
    r.restaurant_id,
    e.establishment_id,
    r.name, 
    r.price, 
    r.url,
    e.nom as establishment_name,
    e.description as establishment_description,
    e.description_eng as establishment_description_eng,
    e.opening as establishment_opening,
    e.closure as establishment_closure
    FROM restaurant as r
    INNER JOIN establishment as e ON e.restaurant_id = r.restaurant_id
    LEFT JOIN food_to_restaurant as ftr ON r.restaurant_id = ftr.restaurant_id
    LEFT JOIN type_food as tf ON tf.type_food_id = ftr.type_food_id
    '''

    filters = []
    params = []
    typeArgs = request.args.getlist('type')
    priceArgs = request.args.getlist('price')
    establishmentName = request.args.get('establishment_name')

    if typeArgs:
        type_filters = [f"tf.type IN ({', '.join(['%s']*len(typeArgs))})"]
        filters.extend(type_filters)
        params.extend(typeArgs)

    if priceArgs:
        price_filters = [f"r.price IN ({', '.join(['%s']*len(priceArgs))})"]
        filters.extend(price_filters)
        params.extend(priceArgs)

    if establishmentName:
        filters.append("e.nom LIKE %s")
        params.append(f"%{establishmentName}%")

    if filters:
        query += " WHERE " + " AND ".join(filters)

    cursor.execute(query, params)
    rows = cursor.fetchall()

    # Close the cursor, as you're done with it
    cursor.close()
    data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]

    return jsonify(data)


# Endpoint to authenticate user using Basic Authentication
@app.route('/signin', methods=['GET'])
def signin():
    # Access user information from the Flask context (g object)
    user = getattr(g, 'user', None)

    if user:
        return jsonify({"message": "Login successful", "user_id": user["user_id"]})

    # If execution reaches here, it means the middleware did not authenticate the user
    return jsonify({"message": "Invalid credentials"}), 401


@app.route('/users/<uuid:user_id>/foodlist', methods=['GET'])
def user_foodlist_list(user_id):
    db = get_db()
    cursor = db.cursor()

    query = '''
SELECT
    flu.foodlist_user_id,
    flu.name AS name
FROM
    foodlist_user flu
WHERE
    flu.users_id = %s
;
    '''

    try:
        cursor.execute(query, (str(user_id),))
        rows = cursor.fetchall()
        data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]

        # Close the cursor, as you're done with it
        cursor.close()
        return jsonify(data)
    except Exception as e:
        print(f"Error executing query: {e}")
        return jsonify({"error": "An error occurred while processing your request"}), 500


@app.route('/users/<uuid:user_id>/foodlist/<int:foodlist_user_id>', methods=['GET'])
def user_foodlist_restaurants_list(user_id, foodlist_user_id):
    db = get_db()
    cursor = db.cursor()

    query = '''
    SELECT
        r.restaurant_id,
        r.name AS name,
        e.nom as establishment_name,
        r.price AS price,
        r.url AS url
    FROM
        foodlist fl
    INNER JOIN
        foodlist_user flu on flu.foodlist_user_id = fl.foodlist_user_id
    INNER JOIN
        establishment e ON fl.establishment_id = e.establishment_id
    INNER JOIN
        restaurant r on r.restaurant_id = e.restaurant_id
    WHERE
        flu.users_id = %s
        AND fl.foodlist_user_id = %s;
    '''
    cursor.execute(query, (str(user_id), str(foodlist_user_id)))
    rows = cursor.fetchall()

    # Close the cursor, as you're done with it
    cursor.close()

    data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]

    return jsonify(data)


@app.route('/users/<uuid:user_id>/foodlist/<int:foodlist_user_id>', methods=['DELETE'])
def user_foodlist_restaurants_delete(user_id, foodlist_user_id):
    db = get_db()
    cursor = db.cursor()

    query_foodlist = 'DELETE FROM foodlist WHERE foodlist_user_id = %s'
    query_user_foodlist = 'DELETE FROM foodlist_user WHERE users_id = %s AND foodlist_user_id = %s'

    cursor.execute(query_foodlist, (str(foodlist_user_id),))
    cursor.execute(query_user_foodlist, (str(user_id), str(foodlist_user_id)))

    # Commit the changes to the database
    db.commit()

    # Close the cursor, as you're done with it
    cursor.close()

    return jsonify({"message": "Foodlist deleted"}), 204


@app.route('/users/<uuid:user_id>/foodlist', methods=['POST'])
def create_user_foodlist(user_id):
    db = get_db()
    cursor = db.cursor()

    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({"message": f"Bad Json provided: {str(e)}"}), 400

    foodlist_name = data.get('name')  # Assuming you provide the name for the new foodlist
    establishment_ids = data.get('establishment_ids')  # Assuming you provide a list of restaurant IDs

    # Check if the foodlist name and restaurant IDs are provided
    if not foodlist_name or not establishment_ids:
        return jsonify({"message": "Missing foodlist name or establishment IDs"}), 400

    # Insert the new foodlist into the database
    cursor.execute("INSERT INTO foodlist_user (users_id, name) VALUES (%s, %s) RETURNING foodlist_user_id",
                   (str(user_id), foodlist_name))
    foodlist_user_id = cursor.fetchone()[0]

    # Associate restaurants with the new foodlist
    for establishment_id in establishment_ids:
        cursor.execute("INSERT INTO foodlist (foodlist_user_id, establishment_id) VALUES (%s, %s)",
                       (foodlist_user_id, establishment_id))

        # Commit the changes to the database
    db.commit()

    # Close the cursor, as you're done with it
    cursor.close()

    return jsonify({"message": "Foodlist created successfully", "foodlist_user_id": foodlist_user_id}), 201


# Endpoint to register a new user
@app.route('/signup', methods=['POST'])
def signup():
    db = get_db()
    cursor = db.cursor()

    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({"message": f"Bad Json provided: {str(e)}"}), 400
    login = data.get('login')
    password = data.get('password')

    # Check if login and password are provided
    if not login or not password:
        return flask.jsonify({"message": "Missing login or password"}), 400

    # Check if the user already exists
    cursor.execute("SELECT users_id FROM users WHERE login = %s", (login,))
    if cursor.fetchone():
        return flask.jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Insert the new user into the database
    cursor.execute("INSERT INTO users (login, password) VALUES (%s, %s) RETURNING users_id", (login, hashed_password))
    user_id = cursor.fetchone()[0]
    # Commit the changes to the database
    db.commit()

    # Close the cursor, as you're done with it
    cursor.close()

    return flask.jsonify({"message": "User registration successful", "user_id": user_id})


if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context='adhoc', port=5000, debug=True, threaded=True)
