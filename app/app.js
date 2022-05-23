// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

//  Use the Pug Templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    // Set up an array of data
    res.send("Hello World");
});

app.get("/results", function(req, res) {
    var sql = 'select * from results';

    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output+= '<tr>'
            output += '<td>' + row.matchid + '</td>';
            output += '<td>' + row.homeTeam + '</td>';
            output += '<td>' + row.score + '</td>';
            output += '<td>' + row.awayTeam + '</td>';
            output += '</tr>'
            

            
        }
        output+= '</table>';
        res.send(output);
    });
});

app.get("/league", function(req, res) {
    var sql = 'select * from league join teams WHERE teams.teamName = league.teamName';

    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            console.log(row);
            output+= '<tr>'
            output += '<td>' + row.position + '</td>';
            output += '<td>' + '<a href="./matches/' + row.teamid + '">' + row.teamName +  '</a>' + '</td>';
            output += '<td>' + row.wins + '</td>';
            output += '<td>' + row.draws + '</td>';
            output += '<td>' + row.losses + '</td>';
            output += '<td>' + row.points
             + '</td>';
            output += '</tr>'
            
        }
        output+= '</table>';
        res.send(output);
    });
});




app.get("/matches/:id", function(req, res) {
    var sql = 'select * from matches'; 
    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output+= '<tr>'
            output += '<td>' + row.teamName + '</td>';
            output += '<td>' + row.teamNamee + '</td>';
            output += '</tr>'
            

            
        }
        output+= '</table>';
        res.send(output);
    });


});










// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});





// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running underground at http://127.0.0.1:3000/`);
});