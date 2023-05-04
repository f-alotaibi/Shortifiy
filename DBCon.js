var mysql = require('mysql2/promise');
// connect to the db
dbConnectionInfo = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
};

//create mysql connection pool
var dbconnection = mysql.createPool(
  dbConnectionInfo
);

module.exports = dbconnection;