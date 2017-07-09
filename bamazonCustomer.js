const mysql = require('mysql');

//Input connection info for mySQL database
const connection = mysql.createConnection({
    hose: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Stars4life',
    database: 'bamazon_DB'
});


//Connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
})
