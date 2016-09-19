 var prompt = require('prompt');

 var Prompt = require('prompt-improved');


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
 })

 var prompt = new prompt();

 // prompt.ask('What is the Item ID of the item you would like to buy?', function(err, res) {
 //     if (err) return console.error(err);
 //     console.log('Response: ' + res);
 // });

 // prompt.ask('How many would you like to buy', function(err, res) {
 // 	if (err) return console.err(err);
 // 	console.log('Resonse: ' + res);

 // });

//  prompt.ask([{
//     question: 'What is the Item ID of the item you would like to buy?',
//     key: 'itemID',
// }, {
//     question: 'How many would you like to buy?',
// }], function(err, res) {
//     if (err) return console.error(err);
//     console.log('Item Chosen: ' res.ItemID);
//     console.log('Quantity: ' res['How many would you like to buy?']);
// });

var prompt = new Prompt();
prompt.ask([{
    question: 'Who\'s your daddy?',
    key: 'father',
}, {
    question: 'What is your Mothers name?',
}], function(err, res) {
    if (err) return console.error(err);
    console.log('Father\'s name: ' res.father);
    console.log('Mother\'s name: ' res['What is your Mothers name?']);
});
