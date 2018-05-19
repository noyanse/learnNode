const express = require('express');
const cookieParser = require('cookie-parser')
var server = express();

//cookie
/*server.use('/',function(req,res){
	res.cookie('user','blue')//发送cookie
	res.send('ok')
})
*/
/*
server.use('/aaa/a.html',function(req,res){
	res.cookie('user','blue',{path:'/aaa',maxAge:30*24*3600*1000})
	res.send('ok')
})
*/
//---------------------------------------
//cookie-parser

/*server.use(cookieParser());
server.use('/',function(req,res){
	console.log(req.cookies)//获取cookie
	res.send('ok')
})
*/
//----------------------------------------
//给cookie签名
/*
server.use(cookieParser());
server.use('/',function(req,res){
	req.secret = 'iloveyoudoyouloveme';
	res.cookie('user','mottoko',{signed:true})
	res.send('ok')
})
*/
//s%3Amottoko.b7MZqi4mfAto6Eljo5DBLCdP6yEPnCAAbhyUMiXdpjM

//获取签过名和为签过名的cookie
//校验cookie
server.use(cookieParser('iloveyoudoyouloveme'));
server.use('/',function(req,res){
	//给cookie签名
	req.secret = 'iloveyoudoyouloveme';
	//设置cookie
	res.cookie('user','jia',{signed:true});
	//获取签过名的cookie
	console.log('signed:',req.signedCookies)
	//获取未签过名的cookie
	console.log('unsigned',req.cookies)
	res.send('ok')
})

server.listen(8081);