新建库 learn
建表：
banner_table
建表最好加上注释

做后台管理页面

npm install express 
mysql express-static 
body-parser
multer
cookie-parser
cookie-session
consolidate
ejs
express-route 
-D

数据库再添个管理员表

route:把大的网站划分成小的模块
普通用户--前台部分
管理员用户--后台管理部分

route：小型的express

-------------------------------

目录：
+static  -- 静态文件 
	+upload
+template -- 模板文件
	+web
	+admin

+libs     --自己编译的库
+route
	+web
	+admin    

------------------------------

server.js:
//引入模块
const express=require('express');
const static=require('express-static');
const mysql=require('mysql');
const bodyParser=require('body-parser')
const multer=require('multer');
const multerObj=multer({dest: './static/upload'})
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');

var server = express();
server.listen(8080)

//-------步骤-------------------

//1.获取请求数据
	//get自带
	server.use(multerObj.any());
//2.cookie/session
	server.use(cookieParser());
	//防止污染变量，用局部的命名空间包起来

	(function(){
		var keys=[];
		for(var i=0;i<100000;i++){
			keys[i]='a_'+Math.random();
		};
		server.use(cookieSession({
			name: 'sess_id',
			keys: keys,
			maxAge: 20*60*1000//20min
		}));
	})()
	

//3.模板
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html')

//4.route
/*
server.use('/article',createRouter());


var r2=express.Router();
server.use('/blog',r2);
r2.use('/q.html',function(req,res){
	res.send('我是博客').end();
})
*/
//route最好的写法
/*
function createRouter(){
	var router=express.Router();

	router.use('/1.html',function(req,res){
	res.send('我是文章').end();
	})
	router.use('/2.html',function(req,res){
		res.send('我是2文章').end();
	})
	return router;
}
*/
// var r1=createRouter();

//5.default:static
server.use(static('./static/'))

---------------------------------------

+template/admin下新建login.ejs:

form提交到服务器需要name和submit

在route下新建两个router：
const express=require('express');

module.exports=function(){
	var router=express.Router();
	router.get('/',(req,res)=>{
		res.send('我是admin').end();
	})
	return router;
}

server:
//route
//如果用户访问的是根目录，就让他去web
server.use('/',require('./route/web.js')());
////如果用户访问的是根目录，就让他去admin
server.use('/admin/',require('./route/admin.js')());

进入admin中，但凡没用登录的，就给打进login中

31...没看完

+template/admin下新建index.ejs用来管理首页
头部导航栏应该是通用的
所以在+template/admin下新建一个文件夹components
top.inc.ejs

+template/admin/components/top.inc.ejs:
<div class="left-wrap">
	<a href="/admin/">管理首页</a>
	<a href="/admin/banners">banner设置</a>
	<a href="/admin/blog">blog设置</a>
	<a href="/admin/contact">联系方式</a>
	<a href="/admin/custom">用户评价</a>
	<a href="/admin/intro">产品介绍</a>
	<a href="/admin/msg">留言管理</a>
	<a href="/admin/news">新闻管理</a>
</div>

+template/admin/index.ejs:
<% include components/top.inc.ejs %>

+route/admin.js:
router.get('/',(req,res)=>{
	// res.send('恭喜您成功登录').end();
	res.render('admin/index.ejs',{})
})

//需要内容变化
router.get('/banners',(req,res)=>{
	res.render('admin/banners.ejs',{
		
	})
})

31...看完