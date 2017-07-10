const mysql = require('mysql');
const Table = require('cli-table');
const prompt = require('prompt');

//Input connection info for mySQL database
const connection = mysql.createConnection({
    hose: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Stars4life',
    database: 'bamazon_DB'
});


var productPurchased = [];


//Connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //connect to the mysql database and pull the information from the Products database to display to the user
    connection.query('SELECT id, product_name, department_name, price, stock_quantity FROM Products', function(err, result) {
        if (err) console.log(err);

        //creates a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['ItemID', 'Product Name', 'Department', 'Price', 'Stock'],
        });
        //loops through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < result.length; i++) {
            table.push(
                [result[i].id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]
            );
        }
        console.log(table.toString());
    });
    purchase();
});


//the purchase function so the user can purchase one of the items listed above
var purchase = function(){
    var productInfo = {
        properties: {
            itemID: ('Please enter the Item ID of the item you would like to purchase'),
            Quantity: ('How many items would you like to purchase?')
        },
    };
    prompt.start();

    //gets the responses to the prompts above
    prompt.get(productInfo, function(err, res) {

        var custPurchase = {
            itemID: res.itemID,
            Quantity: res.Quantity
        };
        //the variable established above is pushed to the productPurchased array defined at the top of the page
        productPurchased.push(custPurchase);
    })
}
