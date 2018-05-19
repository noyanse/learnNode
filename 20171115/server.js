 const express = require('express');
 //const expressStatic = require('express-static')
 var server = express();
 server.listen(8080);

//用户数据users
var users = {
	'blue':' 123',
	'zhanf': '2333',
	'li': 'www'
};

//接口可以一个一个处理
server.get('/login',function(req,res){
	//req.query;//就收get请求
	var user = req.query['user'];
	var pass = req.query['pass'];

	if(users[user] == null){//此用户不存在
		res.send({ok: false, msg: '此用户不存在'})
	}else{
		if(users[user] != pass){
			res.send({ok: false, msg: '密码错了'})
		}else{
			res.send({ok: true, msg: '成功'})
		}
	}
})

server.get('/register',function(){

})