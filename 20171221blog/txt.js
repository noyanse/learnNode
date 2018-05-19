准备工作
npm install
express 
express-static
cookie-parser 
cookie-session
body-parser 
multer
consolidate 
mysql
ejs

把banner图存入数据库banner_table:
ID title sub_title src
	海		边		images/1.jpg
	海1		蓝		images/2.jpg
	海2		黑		images/3.jpg
接下来从数据库中把数据取出来
var db = mysql.createConnection({host:'localhost',user:'root','password':'123456',database:'blog'})
db.query()
保持多个数据库连接，性能会高很多
因为如果一个用户没查完，另一个用户
可以不用等
方法：
在外围创建一个连接池
const db=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'blog'
})
每次保持50个连接，来了就能用


server.js:
//接受用户请求
server.get('/',function(req,res){	
	db.query("SELECT * FROM banner_table",(err,data)=>{
		if(err){
			console.log(err)
			//发送一个500的状态码
			res.status(500).send('database error').end();
		}else{
			console.log(data)
			res.render('index.ejs',{banners:data})//指定编译哪个模板文件
		}
	})
	
	
})

index.ejs:
<ul>
	<% for(var i=0;i<banners.length;i++){ %>
		<li>
			<img src="<%= banners[i].src %>" alt=""/>
			<div class="text-box">
				<h2><%= banners[i].title %></h2>
				<p><%= banners[i].sub_title %></p>
			</div>
		</li>
	<% } %>
</ul>

express-static处理静态数据
npm install express-static
一般情况下我们的请求要么是
一个符合RESTFUL的接口，
有时候它会是一个文件，
比如html或css或png等。这个时候，
我们判断路径那么会比较费力，
如果能直接判断一下它是否是静态文件，
如果是，直接去我们指定的文件夹里面去找，
这样我们就不用判断路径然后处理
这一类的请求了