CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurant(
    restaurant_id SERIAL primary key,
    name varchar(50) not null,
    price varchar(50) not null,
    url varchar(100)
);

CREATE TABLE establishment(
    establishment_id SERIAL primary key,
    restaurant_id integer not null,
    nom varchar(50),
    description varchar(200),
    opening decimal,
    closure decimal,
    FOREIGN KEY(restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE users(
    users_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    login varchar(20) not null,
    password varchar(200) not null,
    unique(login)
);

CREATE TABLE note(
    note_id SERIAL primary key,
    note decimal not null,
    establishment_id int not null,
    users_id UUID not null,
    FOREIGN KEY(users_id) REFERENCES users(users_id),
    FOREIGN KEY(establishment_id) REFERENCES establishment(establishment_id)
);

CREATE TABLE type_food(
    type_food_id SERIAL primary key,
    type varchar(50) not null,
    category varchar(30) not null
);

CREATE TABLE food_to_restaurant(
    type_food_id int not null,
    restaurant_id int not null,
    PRIMARY KEY (type_food_id, restaurant_id),
    FOREIGN KEY(restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY(type_food_id) REFERENCES type_food(type_food_id)
);

CREATE TABLE foodlist_user(
    foodlist_user_id SERIAL PRIMARY KEY,
    name varchar(30) not null,
    users_id UUID not null,
    FOREIGN KEY(users_id) REFERENCES users(users_id)
);

CREATE TABLE foodlist(
    foodlist_id SERIAL primary key,
    establishment_id int not null,
    foodlist_user_id integer not null ,
    FOREIGN KEY(foodlist_user_id) REFERENCES foodlist_user(foodlist_user_id),
    FOREIGN KEY(establishment_id) REFERENCES establishment(establishment_id)
);
