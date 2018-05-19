const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const ejs = require('ejs') 
const consolidate = require('consolidate')
const mysql = require('mysql')

const db = mysql.createPool({host:'localhost',user:'root','password':'123456',database:'blog'})
var server = express()
server.listen(8080)

//规划
//1.解析cookie

server.use(cookieParser('njiowrnfurigji'));

//2.使用session

var arr=[];
for(var i=0;i<100000;i++){
	arr.push('keys_'+Math.random())
}
server.use(cookieSession({name:'sss_id',keys: arr,maxAge: 20*3600*1000}))

//3.post数据
server.use(bodyParser.urlencoded({extended:false}))
server.use(multer({dest:'./www/upload'}).any())

//4.配置模板引擎
	server.set('view engine','html');
	server.set('views','./template');
	server.engine('html',consolidate.ejs);

//接收用户请求
server.get('/',function(req,res){	
	db.query("SELECT * FROM banner_table",(err,data)=>{
		if(err){
			console.log(err)
			//发送一个500的状态码
			res.status(500).send('database error').end();
		}else{
			console.log(data)
			res.render('index.ejs',{banners:data})
		}
	})	
	
})

//5.static数据

server.use(static('./www'))