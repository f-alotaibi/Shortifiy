var mysql = require('mysql2/promise');
// connect to the db
dbConnectionInfo = {
  host: process.env.MY_HOST,
  port: process.env.MY_PORT,
  user: process.env.MY_USER,
  password: process.env.MY_PASSWORD,
  database: process.env.MY_DATABASE,
};

//create mysql connection pool
var dbconnection = mysql.createPool(
  dbConnectionInfo
);

module.exports = dbconnection;