const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const ejs=require('ejs');
const exressRouter=require('express-route');
const mysql=require('mysql');


var server=express();
server.listen(1377);


// server.use('/',function(req,res){
// 	res.setHeader('Content-Type', 'text/html')
// })



//解析数据
server.use(bodyParser.urlencoded())
var multerObj=multer({dest: './static/upload'});
server.use(multerObj.any());

//cookie,session

server.use(cookieParser());

(function(){
	var keys=[];
	for(var i=0;i<100000;i++){
		keys[i]='a_'+Math.random();
	}
	server.use(cookieSession({
		name: 'admin_id',
		keys: keys,
		maxAge: 20*60*1000
	}))
})()


//模板
server.set('engine view','html');//以什么方式呈现
server.set('views','template');//模板的位置
server.engine('html',consolidate.ejs);//用什么模板


//route
server.use('/',require('./route/web')());
// server.use('/',require('./route/web/index')());
server.use('/admin/',require('./route/admin/index')());



//static
server.use(static('./static/'))

//设置跨域访问
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});