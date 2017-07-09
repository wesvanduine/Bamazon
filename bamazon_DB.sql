DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
		id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (40) NOT NULL,
    department_name VARCHAR (40) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

-- Insert 10 mock items into the table
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Iphone', 'Electronics', 650.00, 45), ('Soap', 'kitchen', 9.50, 50), ('Amazon Echo', 'Electronics', 89.00, 24), ('Camping Charis', 'Outdoors', 15.00, 15), ('Bose Headphones', 'Electronics', 15.00, 30), ('Rice Maker', 'Kitchen', 40.00, 10), ('Running Watch', 'Outdoors', 130.00, 25), ('Kitchen Towels', 'Kitchen', 40.00, 10), ('Laptop', 'Electronics', 550.00, 8), ('Storage Shed', 'Outdoors', 100.00, 5); 
