...接blog

先填数据，打开navicat
建表：
简介并不是文章的头几个字
不要采用从content里面切前几十个字
可以弄个专门的简介
插入栏位summary varchar 50 不是空
完了之后在article_table中添加数据:
右下角表单查看:
author_src images/demo.png
post_time 1514251055985单位是秒(造数据在浏览器控制台输入：new Date().getTime())
server.js:
server.get('/',(req,res,next)=>{
	db.query("SELECT * FROM banner_table",(err,data)=>{
		if(err){
			console.log(err)
			res.status(500).send('database error').end();
		}else{
			console.log(data)
			res.banners=data;//把查好的信息放到res身上往下传递
			next();
		}
	})	
})
//查询文章列表
server.get('/',function(req,res,next){	
	// console.log(res.banners)

	db.query('SELECT title,summary FROM article_table',(err,data)=>{
		if(err){
			res.status(500).send('database err').end()
		}else{
			res.articles=data;//把数据传到下一级
			next();
		}
	})
})
//渲染
server.get('/',(req,res)=>{
	res.render('index.ejs',{banners:res.banners,articles:res.articles})
})

//点击文章进入详情页
server.get('/article',(req,res)=>{
	res.render('conText.ejs',{})
})
//在Template中新建conText.ejs就是内容页

<!-- 文章 -->
<div class="content">	
	<ul>
		<% for(var i=0;i<articles.length;i++){ %>

		<li>
			<a href="/article?id=">
				<h3><%= articles[i].title %></h3>
				<p><%= articles[i].summary %></p>
			</a>
		</li>

		<% } %>
	</ul>
</div>


要点不同的文章进入不同的内容页
在index.ejs中a链接上加上id
<a href="/article?id"></a>
那么db.query('SELECT')要加上id
db.query('SELECT ID,title,summary FROM article_table',(err,data)=>{
	if(err){
		res.status(500).send('database err').end()
	}else{
		res.articles=data;//把数据传到下一级
		next();
	}
})
<a href="/article?id=<%= articles[i].ID %>></a>

server.get('/article',(req,res)=>{
	if(req.query.id){
		db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`,(err,data)=>{
			if(err){
				res.status(500).send('数据库有问题').end();
			}else{
				if(data.length==0){
					res.status(404).end();
				}else{
					var articleData=data[0];//处理数据
		            articleData.sDate=common.time2date(articleData.post_time);//前台时间习惯毫秒，后台时间是秒，要转换
		            articleData.context = (isNaN(articleData.context)) ? articleData.context.replace(/^/gm, '<p>').replace(/$/gm, '</p>') : null;
		        	//加上不是数字的判断就node就不会报cannot read property 'replace' of undefined的错
					res.render('conText.ejs',{
						article_data:articleData
					})
					
				}
			}
		})
	}else{
		res.status(404).send('您请求的文章找不到').end()
	}
})

在conText.ejs中输入看数据有没有加进去
<%= JSON.stringify(article_data) %>

conText.js:
<div class="content">
	<div class="header clear">
        <h2><img src="img/head.png" alt=""/></h2>
        <p><%= article_data.author %></p>
    </div>
    <div class="cont">
    	<h3><%= article_data.title %></h3>
        <div class="time">
            <p><%= article_data.sDate %><span><img src="<%= article_data.author_src %>" alt=""/></span></p>

        </div>
        <div class="text-box">
            <%- article_data.context %>
        </div>
    </div>
</div>


用正则来分段
行首换成<p>,行尾换成</p>
var str=str.replace(/^/gm,'<p>').replace(/$/gm,'</p>');

ejs帮你转义输出

不转义：把ejs中的等号换成减号就可

ejs后台渲染
	后台渲染会导致页面刷新，而且a链接参数太多麻烦
前台渲染更好


---------------------------------------------------

点赞功能

a链接href
/article?id<%=article_data.ID%>&act=like
UPDATE 表 SET 字段=值

UPDATE article_table SET n_like=n_like+1 WHERE ID=xxx

if(req.query.act=='like'){//如果act是like
	db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`,(err,data)=>{
		if(err){
			res.status(500).send('数据库有问题').end();
			console.log(err)
		}else{

		}
	})
}


检测用户是否赞过,一个用户只能赞一次

---------------------------------------------------------


数据库

SQL语句
四大基本操作语句
增删改查

1.删 DELETE
	删：DELETE 只能整列的删除，所以不用*
	DELETE FROM 表 WHERE 条件
2.增 INSERT
	INSERT INTO 表(字段=值) VALUES(值列表)
3.改 UPDATE
	UPDATE 表 SET z字段=值，字段=值，... WHERE 条件
4.查 SELECT
	SELECT * FROM 表 WHERE 条件


------------------------------------------------------


子句：
WHERE 条件:
WHERE name='blue'
WHERE age>=18
WHERE age>=18 AND score<60
WHERE cash>100 OR score>10000

-----------------------------------

排序ORDER

ORDER BY age ASC/DESC
年龄通过升序/降序排序
ORDER BY price DESC

*价格升序排序，如果价格相同，再按照销量降序排序
ORDER BY price ASC,sales DESC

-----------------------------------------

GROUP 聚类-合并相同
*统计每个班的人数

新建数据库student_table
class   name
1       小名
2       小花
2       小白
1       小名
2       小花
2       小白
1       小名
2       小花
2       小白

SELECT * FROM student_table;

要一个班的人，用到GROUP

SELECT * FROM student_table GROUP BY class;
只要是相同的class只保留一条
*单独来用仅仅是去重的效果

SELECT class,COUNT(class) FROM student_table GROUP BY class;
CLUNT计个数

--------------------------------------------------

WHERE子句
ORDER子句----多条件排序
GROUP---------合并配合起COUNT,MIN,MAX,AVG用

--------------------------------------------------

24结束


------------------------------------------

javascript
阵列
var a = [];
索引就是位置
