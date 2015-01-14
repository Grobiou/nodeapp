//Module Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodeapp');

var portnumber = 3000;

//Initialize Express

var app = express();
console.log('Express ha iniciado');

function compile(str,path){
	return stylus()
	.set('filename',path)
	.use(nib());
}

//Set Views Folder
app.set('view engine', 'jade');
console.log('Jade ha iniciado');

//Stylus Middleware
app.use(expess.logger('dev'));
app.use(expess.json());
app.use(expess.urlenconded());
app.use(expess.methodOverride());
app.use(expess.cookieParser('mykey'));
app.use(expess.session());
app.use(app.router);
app.use(stylus.middleware(
	{
		src:__dirname + '/public',
		compile: compile
	}
));

app.use(express.static(__dirname+'/public'));

app.get('/',routes.index);
app.get('/users',user.list);
app.get('/userlist',routes.userlist(db));
app.post('/adduser',routes.adduser(db));


app.get('/about',function(req,res){
	res.send('<h1>About us</h1>');
});

app.get('/about/:title',function(req,res){
	res.send('<h1>'+req.params.title+'</h1>');
});

app.get('/*',function(req,res){
	res.send('<h1>We don\'t have the page'+req.params.title+' that your are looking for.</h1>');
});

console.log('Server Started on Localhost:3000');
app.listen(3000);