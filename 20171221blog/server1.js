const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const ejs = require('ejs') 
const consolidate = require('consolidate')
const mysql = require('mysql')



//连接池
const db = mysql.createPool({host:'localhost',user:'root','password':'123456',database:'blog'})
const common=require('./libs/common')

var server = express()
server.listen(8082)

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

//---------------------------首页----------------------------------------------------------------

server.get('/',function(req,res,next){	
	//查询banners
	db.query("SELECT * FROM banner_table",(err,data)=>{
		if(err){
			console.log(err)
			//发送一个500的状态码
			res.status(500).send('database error').end();
		}else{
			// console.log(data)
			res.banners=data;
			next();
		}
	})	
	
})
server.get('/',function(req,res,next){	
	// console.log(res.banners)
	//查询文章列表
	db.query('SELECT ID,title,summary FROM article_table',(err,data)=>{
		if(err){
			res.status(500).send('database err').end()
		}else{
			res.articles=data;//把数据传到下一级
			next();
		}
	})
})
server.get('/',(req,res)=>{
	res.render('index.ejs',{banners:res.banners,articles:res.articles})
})

//------------------------详情页-------------------------------------------------------------------

//点击文章进入详情页

server.get('/article',(req,res)=>{
	if(req.query.id){
		if(req.query.act=='like'){//如果act是like
			//增加一个赞
			db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`,(err,data)=>{
				if(err){
					res.status(500).send('数据库有问题').end();
					console.log(err)
				}else{
						//显示文章
					db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`,(err,data)=>{
						if(err){
							res.status(500).send('数据库有问题').end();
						}else{
							if(data.length==0){
								res.status(404).end();
							}else{
								var articleData=data[0];
				            articleData.sDate=common.time2date(articleData.post_time);
				            articleData.context = (isNaN(articleData.context)) ? articleData.context.replace(/^/gm, '<p>').replace(/$/gm, '</p>') : null;
					            // articleData.context=articleData.context.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
								res.render('conText.ejs',{
									article_data:articleData
								})
								
							}
						}
					})

				}
			})
		}else{
			//如果act不是like
		}
		
	}else{
		res.status(404).send('您请求的文章找不到').end()
	}
})




//5.static数据

server.use(static('./www'))