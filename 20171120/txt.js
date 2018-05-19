http-无状态的
cookie session
cookie:在浏览器保存一些数据，每次请求都会带过来、
	cookie可以通过控制台来改：
	用户可以修改cookie，非常的不安全
	比如把用户的余额放到cookie里，非常的
	* 不安全
	* 有限（4k）
	document.cookie = 'BD_HOME=1'

session:也是保存数据， 功能和cookie一样，唯一的
区别是保存在服务端，这样的话，用户就无法修改
* 安全级别和数据库是一个级别的
* 无限（当然服务器空间也是有限的）
* 不可能独立存在，基于cookie实现的

session怎么实现的
* cookie中会有一个session的ID，服务器利用sessionid找到
session的文件、读取、写入
隐患：session劫持

cookie
1.读取---cookie-parser
2.发送

server.js
npm install express cookie-parser cookie-session
const express = require('express')
cosnt cookieParser = require('cookie-parser')
var server = express()
//cookie key,value
server.use('/aaa/a.html',function(req,res){	
	res.cookie('user','blue',{path:'/aaa',maxAge:30*24*3600*1000})//30天以毫秒为单位

	res.send('ok');

})
localhost:8080/aaa/a.html


server.use(cookieParser());
server.use('/',function(req,res){
	console.log(req.cookies);
	res.send('ok')
})

/		根目录可以访问ccc下面的cookie
	/aaa 也可以访问
		/ccc 有cookie

	/bbb 不可以访问

server.use(cookieParser());
server.use('/',function(req,res){	
	//res.cookie('user','mottoko')//没有加密，人人都能看到
	//cookie签名，仍然可以看到，但是避免了修改
	//签名必须和后面的一致，防止篡改
	req.secret = 'ngfresigning';//是放在后台的
	res.cookie('user','mottoko',{signed:true})//签名
	console.log(req.cookies);//
	res.send('ok')
})

//校验签名
server.use(cookieParser('ngfresigning'));//密钥
server.use('/',function(req,res){
	req.secret = 'ngfresigning';//设置密钥
	//发送cookie
	res.cookie('user','mottoko',signed:true)
	//获取cookie
	console.log('签名的:',req.signedCookies)//签过名的cookie
	console.log('未签名:',req.cookies);
//签过名的cookie浪费空间,cookie本来空间就有限
//s开头就是签过名的
})



-----------------------------------------



安之：
我从小除了读书也没有什么很灵光的地方
也不太会说话
也不会讨人喜欢
除了你，没有人对我这么好过
以后也不会有人对我这么好了
是我太贪心了
还想要别的好
我很喜欢很喜欢姨姨
也很爱姨姨
希望姨姨能幸福
我也会好好的
所以你放心
我会在那边好好学习
也会想念姨姨
在上课的时候
做实验的时候
听讲座的时候
去超市的时候
都会想你姨姨
累的时候也会想到姨姨
我就觉得我可以再努力一下
努力成为厉害的人
所以你不要担心我
所以你要好好的

