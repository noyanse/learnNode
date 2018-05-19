express整合

body-parser
multer

模板引擎

express 模板引擎

consolidate适配整合，帮助express适配各种模板引擎
npm install consolidate
//https://www.npmjs.com/package/consolidate

const consolidate = require('consolidate')
//配置模板引擎
	//输出什么东西
	server.set('view engine','html');以何种方式来呈现
	//那种模板引擎
	server.set('views','./views');
	//模板文件放在哪里
	server.engine('html',consolidate.ejs);

//接受用户请求
server.get('/index',function(req,res){
	//如果登录过呈现1.ejs模板，若没登录过,则呈现Login
	if(req.session.userid){//登录过
		res.render('1.ejs',{name:'blue'})//指定编译哪个模板文件
	}else{//没登录过
		res.render('login.ejs',{})
	}
})
render和send没什么不同:
send是直接向用户发送一些内容
render是编译一个东西并把编译的结果发送给用户

----------------------------------------------------------

模板引擎很多，且各不相同
那么如何适配各个模板引擎，用到了consolidate
步骤
1.引进
consolidate=require('consolidate')
2.告诉用户输出什么
server.set('view engine','html')
3.模板引擎放在哪里
server.set('views','模板文件所在的目录')
4.指定用什么模板
server.engine('html',consolidate.ejs)

server.get('/',function(req,res){
	res.render('模板文件',{数据})
})

---------------------------------------------------

router-----路由

什么叫路由？
把不同的目录对应到不同的模块

xxx.com/aaa/?  ---默认调用aaa模块
xxx.com/news/ ----mod_news
		post      news_post
		list	  news_list
		content	  news_content
xxx.com/user/ ----mod_users

可以有子模块，子路由

是express的一部分

----------------------------------

Router-------相当于迷你版的server
拆
server.get()
server.post()
server.use()


Router.get()
Router.post()
Router.use()

//1.创建
var router=express.Router()
//2.把router添加到server
server.use('/user',router)
//3.router内容
router.get('/1.html')
router.post('/2.html')



------------------------------------------


总结

consolidate

server.set('view engine','html')
server.set('views','模板目录')
server.engine('html',consolidate.ejs)

Router---子服务,只处理一部分


//1.创建
var router=express.Router()
//2.把router添加到server
server.use('/user',router)
//3.router内容
router.get('/1.html')
router.post('/2.html')

子路由：
var router1=express.Route()
server.use('/user',router1)

var r=express.Router()
router1.use('/user_mod',r)
router1.use('/user_reg',function(){})//放个函数处理一些也是可以的
http://www.xxx.com/user/user_mod
http://www.xxx.com/user/user_reg
http://www.xxx.com/user/user_login


var router2=express.Router()
server.use('/news',router2)
http://www.xxx.com/news/list
http://www.xxx.com/news/post
http://www.xxx.com/news/content

var router3=express.Router()
server.use('/item',router3)
