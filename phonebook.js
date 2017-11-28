const express = require('express')
const app = express()
var mysql = require('mysql');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());  // to support url-encoded bodies

//root route
app.get('/', function (req, res) {
  res.send("Hello and welcome to Or's phonebook app")
})

//evade from favicon.ico 
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

//search text in name column
app.get('/search', function(req, res) {
		var con = mysql.createConnection({
  	host: "localhost",
  	user: "root",
  	password: "1234",
  	database: "contacts"
		});
		
				con.connect(function(err) {
  				if (err) throw err;
  				console.log("Connected to database and searching!");
				});
	
					var search_value = req.query.search;
					con.query("select * from contacts where name like '%" + search_value + "%'", function (err, result, fields) {
    				if (err) throw err;
    				if (result.length ==0)
    					res.send("Your search did not produce any results");
    				else
    					res.send(result);

    				res.end();
					});
});




//insert record into database
app.post('/post', function (req, res) {
	var con = mysql.createConnection({
  	host: "localhost",
  	user: "root",
  	password: "1234",
  	database: "contacts"
		});
			con.connect(function(err) {
  				if (err) throw err;
				});
					var name = req.body.name;
					var phone = req.body.phone;
					var address = req.body.address;
					con.query("insert into contacts (name,phone,address) values (" + "'" + name + "',"
					+ "'" + phone + "'," + "'" + address + "')" , function (err, result, fields) {
    				if (err) 
    					throw err
    				else
    					res.send("Your record was saved successfully with id=" + result.insertId);
    				res.end();
					});
});

//present the html form to insert to db
app.use("/post", function (req, res) {
 res.sendFile(__dirname + "/post.html");
});

//fetch by id route
app.get('/fetch/:id', function(req, res) {
		var con = mysql.createConnection({
  	host: "localhost",
  	user: "root",
  	password: "1234",
  	database: "contacts"
		});

				con.connect(function(err) {
  					if (err) throw err;
  							console.log("Connected to database!");
				});

				var userId = req.params.id;
				con.query("select * from contacts where id=" + userId, function (err, result, fields) {
    				if (err) 
    					res.send('error - id must be numerical', err.message, err.stack);
    				else if (result.length == 0) 
    					res.send("There is no user with id=" + userId);
    				else
    					res.send(result);
    				res.end();
  			});
});

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});