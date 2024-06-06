# FYP
## A.	Installation Process :
**a. Back-end folder :**
1.	Right click 'back-end' folder
2.	Go to integrated terminal 
3.	Add this commands to install dependencies:

```
npm install express body-parser bcryptjs pg cors or npm install
```

**b. You should have three new folders :**
1. node modules
2. package.json
3. package-lock.json  


**d. Repeat the above steps to 'front-end' folder**

## B.	Connect to database :
1. Go to back-end folder > models > databaseConfig.js.
2. Make sure the information are the same as the one when you set up your database.
3. Set user as your PostgreSQL username 
    - If unsure, search psql (command shell) on windows, enter ‘\conninfo’ into the terminal.
4. Host would be the host name when setting up your database, in my case I set as localhost.
5. Database name and password are the same during the setting up of your database.

## C.	PostgreSQL Database tables and columns
Add these to the sql query to add the tables into the backend.
**a.	Table 1 : users**
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

**b.	Table 2 : itineraries**
CREATE TABLE itineraries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    itinerary_details JSONB NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

**c.	Table 3 : Trips**
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    invitees TEXT, -- comma-separated email addresses
    FOREIGN KEY (user_id) REFERENCES users(id)
);

## D.	To run the server :
1. Right click 'back-end' folder
2. Go to integrated terminal
3. Add this to the terminal to start the server 

```
npm start
```
4. Do the same for 'front-end' folder