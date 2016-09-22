 var prompt = require('prompt');

 // var Prompt = require('prompt-improved');

 var inquirer = require('inquirer')


 var mysql = require('mysql');

 var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root", //Your username
     password: "Superman1", //Your password
     database: "Bamazon"
 });



 connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as id " + connection.threadId);
 });



 connection.query('SELECT * FROM products', function(err, res) {
     for (var i = 0; i < 12; i++) {
         console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price);
     }
     console.log("-----------------------------------");

     start();
 })

 var start = function() {
     inquirer.prompt([{
         name: "itemChoice",
         type: "input",
         message: "Which Item would you like to buy?"

     }, {
         name: "quantity",
         type: "input",
         message: "How many would you like to buy?"
     }]).then(function(answer) {

         console.log(answer.itemChoice);
         console.log(answer.quantity);
         connection.query('SELECT ItemID, ProductName, StockQuantity FROM products WHERE ?', { ItemID: answer.itemChoice }, function(err, res) {
             console.log("Position: " + res[0].ItemID + " || Product: " + res[0].ProductName + " || Quantity: " + res[0].StockQuantity);

             if (answer.quantity < res[0].StockQuantity) {
                 console.log("You have successfuly purchased " + answer.quantity + " of the " + res[0].ProductName);
                 var newQuantity = res[0].StockQuantity - answer.quantity;
                 console.log("There are " + newQuantity + " left");
                 connection.query('UPDATE products SET ? WHERE ?', [{StockQuantity: newQuantity},{ItemID: answer.itemChoice}], function(err, res){});
                 nexttrans();
             } else {
                 console.log("Insufficient Quantity!")
                 nexttrans();
             }

         })

     })
 };


 var nexttrans = function() {
     inquirer.prompt({
         name: "continue",
         type: "rawlist",
         message: "Would you like to purchase something else? [YES][NO]",
         choices: ["YES", "NO"]

     }).then(function(user) {
         if (user.continue.toUpperCase() == "YES") {
             start()
         } else {
             console.log("Thankyou for shopping with Bamazon!");
             process.exit();
         }
     })
 };
