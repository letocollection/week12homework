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
         message: "Which Item would you like to buy?",

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




 // prompt.start();

 // var Question1 = 'What is the Item ID of the Item you would like to buy?';
 // var Question2 = 'How many would you like to buy?';

 // prompt.get([Question1, Question2], function(err, result) {

 //     var Question1 = 'What is the Item ID of the Item you would like to buy?';
 //     var Question2 = 'How many would you like to buy?';

 //     console.log(Question1.result);
 //     console.log(Question2.result);

 // });

 // prompt.get([{

 //       name: 'What is the item ID # that you would like to buy?',
 //       required: true
 //     }, {
 //       name: 'How many would you like to buy?',
 //       hidden: true,
 //       conform: function (value) {
 //         return true;
 //       }
 //     }], function (err, result) {
 //     // 
 //     // Log the results. 
 //     // 
 //     console.log('Command-line input received:');
 //     console.log('  username: ' + result.username);
 //     console.log('  password: ' + result.password);
 //   });
 //
