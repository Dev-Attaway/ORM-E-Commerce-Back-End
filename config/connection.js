/* OPERATION DESCRPITION:
   Establishes a connection to a MySQL database using Sequelize, 
   a popular Node.js ORM (Object-Relational Mapping) library.
*/

// Imports the Sequelize class from the sequelize library. This class is used to create a Sequelize instance and define models.
// These models can be foound within the models folder
const { Sequelize } = require('sequelize');

// Loads  environment variables from a file named .env
require('dotenv').config();


/* 
 If there is a JAWSDB_URL environment variable. If present, it uses it to create a Sequelize instance for connecting to a remote database.
 This is commonly used in deployment environments like Heroku.
 If JAWSDB_URL is not present, it falls back to using the local MySQL database credentials (DB_NAME, DB_USER, DB_PASSWORD)
 o create a Sequelize instance for connecting to a local database.
*/
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
