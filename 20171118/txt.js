Express:
1.数据：GET,POST
2.中间件
目录：
server.js
form.html
cnpm install express


server.js:
const = express=require('express')
var server = express();
server.listen(8080)
//获取GET数据
server.use('/',function(req,res){
	console.log(req.query)//GET
})

form.html:
<form   action="http://localhost:8080" method="get">
用户名：<input type="text" name="user">
密码：<input type="password" name="pass">
<input type="submit" value="提交">
</form>

执行：
node server.js

//获取POST数据
需要一个中间件body-parser
cnpm install body-parser

server.js:
const bodyParser = require('body-parser');
链式操作：
server.use(bodyParser.urlencoded({

}));
server.use('/',function(req,res){
	console.log(req.body);//POST
})

req.query ---GET
req.body ---POST 需要安装body-parser中间件:
	server.use(bodyParser.urlencoded({}))//解析
	server.use('/',function(req,res){req.body})


	-------------------------------------


	server.use(bodyParser.urlencoded({
	//extended: true,//扩展模式,没什么用
	extended: false,//普通模式
	limit:  2*1024*1024//大小限制，默认100k，2兆
}))

	------------------------------------------------

	链式操作：
//原生body-parser
server.use('/',function(req,res,next){
	//原生的post接收数据
	var str = '';
	req.on('data',function(data){
		str += data//收集数据
	})
	req.on('end',function(){
		//querystring.parse解析成json
		req.body = querystring.parse(str);//把收集的数据加给req.body
		next()
	})

	//req.a = 12;
	//req.body = {xxx}
	//console.log('a')
})

server.use('/',function(req,res){
	console.log(req.a);//也能接受a
	console.log(req.body);
})

链式是可选的，调用next是下一步

-------------------------------------------------
总结：
1.接收GET,POST数据
GET:
req.query
POST:
server.use(bodyParser.urlencoded({limit:}))
server.use(function(req,res,nexy){
	req.body
})
2.链式操作
server.use('/',function(req,res,next){
	console.log(req.body);//POST
})
server.use(function(req,res,next){
	console.log(req.body);//POST
})
//假如从数据库中获取数据出错，就返回错误
//否则才继续执行
server.use('/login',function(){
	mysql.query(function(){
		if(出错){
			res.emit('error');
		}else{
			next()
		}
	})
})
3.中间件(body-parser),自己写中间件
next();
server.use(function(req,res,next){
	req.on('data',function(data){
		str += data
	})
	req.on('end',function(){
		req.body = querystring(str);
		next()
	})
})