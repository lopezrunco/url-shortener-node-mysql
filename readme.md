# URL shortener API

This project is a simple API built with Node.js, Express, and MySQL to create and manage short URLs.

## Setup Instructions

### Prerequisites

1. **Node.js and npm**: Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser. It also includes npm, which is a package manager for Node.js.

     To install Node.js and npm:
     - Visit [nodejs.org](https://nodejs.org/).
     - Download the recommended version for your operating system.
     - Follow the installation instructions provided by the installer.

2. **MySQL installed and running locally**:
   
   - **Install MySQL**:
     - Visit [mysql.com](https://www.mysql.com/) and download the MySQL Community Server installer for your operating system.
     - Follow the installation instructions provided by the installer.

   - **Run MySQL**:
     - After installation, start the MySQL server. The process to start MySQL varies by operating system:
       - On Windows: MySQL should start automatically after installation. You can also start it manually by searching for "MySQL Command Line Client" or using services.
       - On macOS: MySQL can be started from the System Preferences under "MySQL".
       - On Linux: MySQL can be started from the command line using `sudo service mysql start` or `sudo systemctl start mysql`.

### Clone the repository

1. Open your terminal or command prompt.

2. Navigate to the directory where you want to store the project.

3. Use the following command to clone the repository:
```bash
   git clone https://github.com/lopezrunco/url-shortener-node-mysql
```

### Installing Dependencies

After cloning the repository, navigate to the project directory and run the following command to install dependencies:

```bash
    npm install
```

### Setting Up MySQL

1. **Run MySQL:** Ensure your MySQL server is up and running.

2. **Create Database:** Create a MySQL database named `shorturls` using the following SQL command:
```sql
    CREATE DATABASE shorturls;
```

3. **Create Table:** Create a table named `links` within the `shorturls` database to store long URLs, short URL IDs, and visit counts:
```sql
    CREATE TABLE links (
        id int(11) AUTO_INCREMENT PRIMARY KEY,
        longurl varchar(255),
        shorturlid varchar(255),
        count int(11) DEFAULT 0
    );
```

4. **Verify Table:** You can view the structure of the `links` table using:
```sql
    DESC links;
```

### Running the Application

To start the Express server, run the following command:

```sh
    node app.js
```
The server will start on port `5000`.

## API Endpoints

- `GET /`: Serves `index.html` from the `client` directory.

- `POST /api/create-short-url`: Creates a short URL entry in the database.

- `GET /api/get-all-short-urls`: Retrieves all short URL entries from the database.

- `GET /:shorturlid`: Redirects to the original long URL associated with `shorturlid` and updates the visit count.
