# weStudy

weStudy is a social application where users can create and join study groups, chat with other group members, and share notes, images, and events.

This application uses Flask-SocketIO to allow for live chatting between users and live updates of users' online statuses.

| [Live Site](https://we-study-capstone.herokuapp.com) | [MVP Feature List](https://github.com/choi-jihoon/weStudy/wiki/Feature-List-(MVP)) | [Database Schema](https://github.com/choi-jihoon/weStudy/wiki/Database-Schema) | [Frontend Routes](https://github.com/choi-jihoon/weStudy/wiki/Frontend-Routes) | [API Documentation](https://github.com/choi-jihoon/weStudy/wiki/API-Documentation) | [User Stories](https://github.com/choi-jihoon/weStudy/wiki/User-Stories) |

# Technologies Used

weStudy is built on a React / Redux frontend, a Python / Flask backend, and a PostgreSQL database.


It also makes use of socket.io for live chat, AWS S3 for image uploads, and the Google Calendar API to allow users to add events to their personal Google calendar through OAuth.

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height=40 />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original-wordmark.svg" height=40 /><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" height=40 />




# Getting started

1. Clone this repository

   ```git clone git@github.com:choi-jihoon/weStudy.git```

2. CD into the /app directory and install dependencies

    ```pipenv install```

3. CD into the /react-app directory and install dependencies

    ```npm install```

4.  Create a .env file in the root directory based on the .env.example given (An AWS S3 account is required for image uploads!)

5.  Create a user in psql based on your .env DATABASE_URL app_name

    ```psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"```

6.  Create a databse in psql based on your.env DATABASE_URL app_db_name

7. Start your shell, migrate your database, seed your database, and run the flask app

   ```pipenv shell```

   ```flask db upgrade```

    ```flask seed all```

    ```flask run```

8. Open another terminal and change directory into /react-app and run the React app

	```npm start```

9. In order for the Google Calendar API feature to work, you must get a CLIENT_ID and an API_KEY from your Google Developer console and set up OAuth credentials.


# Features
