const express=require('express')

var server=express()

//目录1：/user/
// 每当有人访问http://xxx.com/user/就激活了这个user模块
//创建路由
var routeUser=express.Router();

routeUser.get('/1.html',function(req,res){
	res.send('user1')
	// 用户访问http://xxx.com/user/1.html
})
routeUser.get('/2.html',function(req,res){
	res.send('user2')
	// 用户访问http://xxx.com/user/2.html
})

//告诉express 目录 user下
server.use('/user',routeUser)

//目录2:article

var articleRouter=express.Router();
server.use('/article',articleRouter);
articleRouter.get('/10001.html',function(req,res){
	res.send('article')
})




server.listen(8080)