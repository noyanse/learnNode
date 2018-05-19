const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const jade = require('jade')
const ejs = require('ejs') 
const consolidate = require('consolidate')

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
//body-parser解析普通post数据
server.use(bodyParser.urlencoded({extended:false}))
//multer解析文件数据
server.use(multer({dest:'./www/upload'}).any())

	//用户请求
/*server.use('/',function(req,res,next){
	//读取GET数据，POST数据，cookie数据，session数据
	console.log(req.query,req.body,req.cookies,req.session)
})
*/

//4.配置模板引擎
	//输出什么东西
	server.set('view engine','html');//以何种方式来呈现
	//那种模板引擎
	server.set('views','./views');
	//模板文件放在哪里
	server.engine('html',consolidate.ejs);

//接受用户请求
server.get('/index',function(req,res){
	res.render('1.ejs',{name:'blue'})//指定编译哪个模板文件
	
})

//4.static数据

server.use(static('./www'))