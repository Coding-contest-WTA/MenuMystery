# Menu-Mystery

__Kathleen Equilbec<sup>1</sup>, Elora Vigo<sup>2</sup>, Fiona Hak<sup>2</sup>__
<br>
<sub>1. Lyon University (France) <br>2. Paris-Saclay University, Orsay (France)

This repository contains the source code for the Menu-Mystery web application developed as part of the WEB TECHNOLOGIES FOR APPLICATIONS coding contest.

# Table of contents

- [Requirements](#Requirements)
- [How-to use](#How-to-use)
- [Technical description](#Technical-description)
  - [Database](#Database)
  - [Back end](#Back-end)
  - [Front end](#Front-end)
- [Deployment](#Deployment)
- [License](#License)

## Requirements<a name="Requirements"></a>

To launch the application in developer mode, you need to have docker installed.

On Ubuntu: https://docs.docker.com/engine/install/ubuntu/

On Mac: https://docs.docker.com/desktop/install/mac-install/

## How-to use<a name="How-to-use"></a>

The dependencies are built and the application is launched via :

    make launch-app

If necessary, containers and images can be cleaned via :

    docker system prune -f -a

Then to display the results in a browser (tested on Chrome), go to: http://0.0.0.0/

To display the response to queries at back-end level:

    curl http://0.0.0.0:8002

## Technical description<a name="Technical-description"></a>
All parts of the code are linked and run from dependencies built on docker with docker-compose. 

### Database<a name="Database"></a>
The database has been built in Postgresql v9.3.

<p><img src="front/assets/db/uml_db.png" alt="uml" width="60%"></p>

**Figure 1: Overall structure of the database.**

Initially, the restaurant and establishment tables and the information relating to the type of food offered are filled in. User accounts will be created dynamically using a login and password. Each user will be able to create playlists, which are linked to the restaurants' information.

### Back end<a name="Back-end"></a>
The language used is python. Flask is used to open a server for the back end. The database is connected via psycopg2.  Queries on the database are performed using functions and the results are sent in json format to the open server, which can be viewed via port 8002.

### Front end<a name="Front-end"></a>
The front-end is based on the results provided by the back-end, and fetches the results of queries on 8002. A simple display of these results is managed via an ajax request (jquery). Docker-compose allows the link from the back end and uses a nginx server for now. The final results from the front can be viewed via port 80.

### Deployment<a name="Deployment"></a>
Settings -> endpoints -> id noeud, http, private port (8002) + default
When created, get Hidora adress, modify ajax request on server.

## License<a name="License"></a>

All illustrations for the application were created by Elora Vigo and are released, along with the code, under the APache 2.0 licence.