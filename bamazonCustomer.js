const mysql = require('mysql');
const Table = require('cli-table');
const inquirer = require('inquirer');

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
});

//the purchase function so the user can purchase one of the items listed above
function purchase() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Please enter the Item ID # for the item you would like to buy",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many items would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(input) {
        /*console.log("Customer has selected ItemID: " + input.id + "\nQunatity Selected: " + input.quantity);*/

        //variables to capture customer ID chosen and quantity
        var items = input.id;
        var quantity = input.quantity;
        /*console.log(items + quantity);*/

        // Query db to confirm that the given item ID exists in the desired quantity
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { id: items }, function(err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            /*console.log('data = ' + JSON.stringify(data));*/
            if (data.length === 0 || data.length > 10) {
                console.log("'ERROR: Invalid Item ID. Please select a valid Item ID.'");
                displayInventory();
            } else {

                var productData = data[0];
                /*/*console.log('productData = ' + JSON.stringify(productData));*/
                /*console.log('productData.stock_quantity = ' + productData.stock_quantity);*/

                if (quantity <= productData.stock_quantity) {

                    console.log("Your item is in stock! Placing Order!");
                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + items;
                    /*console.log('updateQueryStr = ' + updateQueryStr);*/

                    // Update the inventory
                    connection.query(updateQueryStr, function(err, data) {
                        if (err) throw err;
                        console.log("Your order has been placed! Your total is $" + productData.price * quantity);
                        console.log("Thank you for shopping with us");
                        console.log("\n----------------------------------------------------\n");

                        // End the database connection
                        displayInventory();
                        connection.end();

                    })

                } else {

                    console.log("There is not enough stock to process your order");
                    console.log("\n------------------------------------------------\n");
                    console.log("Please select a different amount");

                    displayInventory();
                }
            }
        })
    })
}

//connect to the mysql database and pull the information from the Products database to display to the user
function displayInventory() {
    connection.query('SELECT * FROM Products', function(err, result) {
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
        purchase();
    });
};

// runBamazon will execute the main application logic
function runBamazon() {
    // console.log('___ENTER runBamazon___');

    // Display the available inventory
    displayInventory();
}

// Run the application logic
runBamazon();
