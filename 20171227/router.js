
const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const ejs=require('ejs');
const expressRoute=require('express-route');

var server = express();
server.listen(8080);


//route

/*var r1=express.Router();

server.use('/article',r1);
r1.use('/1.html',function(req,res){
	res.send('111111111').end()
})
r1.use('/2.html',function(req,res){
	res.send('222222222').end()
})
*/

/*
server.use('/article/',createRouter());
function createRouter(){
	var router=express.Router();
	router.get('/1.html',function(req,res){
		res.send('111111111').end()
	})
	router.get('/2.html',function(req,res){
		res.send('222222222').end()
	})
	return router;
}
*/
server.use('/article/',require('./router/1.js')());