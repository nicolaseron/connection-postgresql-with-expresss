# Connecting to PostgreSQL Database with Node.js and Express

This repository demonstrates a basic setup to connect a Node.js application to a PostgreSQL database using Express framework. It also covers how to fetch data from the database and display it on the client side.

## Prerequisites

- Node.js installed on your machine.
- PostgreSQL database server running locally or accessible remotely.
- Basic understanding of Node.js and Express.

## Setup

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/nicolaseron/db-connection-postgresql.git
    ```

2. Navigate into the project directory:

    ```bash
    cd db-connection-postgresql
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a PostgreSQL database and note down the connection details such as host, port, username, password, and database name (or connection string sutch as postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName.


5. Create a .env file in root directory and complete your connection details (for more information visit: https://node-postgres.com/features/connecting):

    ```plaintext
    PGHOST=localhost
    PGUSER=YOUR USER NAME
    PGDATABASE=YOUR DATA BASE NAME
    PGPASSWORD=YOUR PASSWORD
    PGPORT=5432
   
