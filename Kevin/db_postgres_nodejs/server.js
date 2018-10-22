const express = require('express'),
      server = express(),
      users = require('./users');
const pg  = require('pg');


const pool = new pg.Pool({
	user: 'sysadmin',
	host: '127.0.0.1',
	database: 'mywebstore',
	password: '12345',
	port: '5432'
});



server.set('port', process.env.PORT || 3000);

server.get('/', (request, response)=> {
	response.sendFile(__dirname + '/index.html');
});



server.get('/users', (request, response)=>{
	pool.query("SELECT * FROM users", (err, res) => {
		console.log
		console.log(err, res);
	});
	console.log(request, response);
});

server.get('/add', (request, response)=>{
	pool.query("INSERT INTO users(id, firstName, lastName) VALUES(4, 'test', 'test1')", (err, res)=> {
		console.log(err, res);
	});

});


server.use((request,response)=>{
	response.type('text/plain');
	response.status(505);
	response.send('Error page');
});

server.listen(3000, ()=>{
	console.log('Express server started');
});
