import mysql from 'mysql2';
const connectionDetails = 
{
    host: "localhost",
    user: "root",
    password: "root", 
    database: "WPT_PROJECT",
};

const connection =  mysql.createConnection(connectionDetails);
export default connection;