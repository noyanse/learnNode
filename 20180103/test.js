const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const multer=require('multer');
const static=require('express-static');
const mysql=require('mysql');
const consolidate=require('consolidate');
const ejs=require('ejs');

var server=express();
server.listen(8081);

//-----------------------解析数据---------------------------------------------------------
	//解析post普通数据
server.use(bodyParser.urlencoded());
	//解析post文件
var multerObj=multer({dest: './static/upload'});
server.use(multerObj.any());


//------------------------cookie session-------------------------------------------------------

server.use(cookieParser());

(function() {
	var keys=[];
	for(var i=0;i<100000;i++){
		keys[i]='keys_' + Math.random();
	}
	server.use(cookieSession({
		name: 'admin_id',
		keys: keys,
		maxAge: 20*60*1000
	}))
})()


//------------------------模板-------------------------------------------------------
server.set('engine view','html');
server.set('views','template');
server.engine('html',consolidate.ejs);

//-------------------------router-------------------------------------------------------

server.use('/',require('./router/index')());
server.use('/admin/',require('./router/admin')());

//-------------------------static-------------------------------------------------------

server.use(static('./static'));