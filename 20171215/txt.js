做一个博客

数据？往哪里放？
数据---数据库

数据库：
常用的MySQL,Oracle
MySQL优点：
社区版免费
适用中小网站
性能非常不错
缺点：
集群，容灾稍微弱一些

Oracle
贵
适合大型应用
金融级
性能非常好，集群，容灾非常强
缺点：挺贵

关系型数据库：MySQL,Oracle
文件型数据库：mongodb,sqlite
mongodb一般把它当成缓存用
空间性数据库...不常用


-------------------------------------------------


MySQL

Server端：
数据存在server端，保存数据


Client端：
管理工具、Node


Server端的安装
官网：mysql.com

skip---server only

配置：
Development Machine 开发的机器，要求不高
Server Machine 安全性高

端口：默认3306 一般不改

root pass : 123456

下载个数据库的管理工具
Navicat for MySQL
扮演的是client角色

连接：
localhost
绿色就连接上了


数据库基本概念：

两种单位：
1.库----类似于文件夹，用来管理表的，本身没法存数据
2.表----文件---用来存数据	

表---跟excel差不多

行：---一条数据
列：---在数据库中叫字段或者域，代表一项数据

新建库：
数据库名
字符集：utf8 -- UTF-8 Unicode
排序规则：utf8_general_ci通用排序标准，覆盖几乎所有的语言

field--域，字段

双击打开
右键新建表
栏位就是字段

用户名 密码
名  类型  不是Null(是否允许为空) 主键 
ID   int	不允许

int 整数

小钥匙图标就是主键：唯一标识符,性能高

添加栏位--插入下一行

数据库性能是关键，长度够用就好

username varchar 32 勾
pass     varchar 32 勾

保存:
	表名：uer_table
右键--设计视图：
注释：自动递增勾选

------------------------------------------

数据库分为服务端和客服端

服务端从官网下载
客户端：管理工具
		Nodejs程序
库：存不了数据
表：存数据
	字段-列
	行：-一条数据



-------------------------------------------

连接Node

npm install mysql

1.js:
1.连接
2.查询-发送请求
const mysql = require('mysql')
//连接
//createConnection(哪台服务器，用户名，密码,操作的库)
var db=mysql.createConnection({host:'localhost',port:3308,user:'root',password,'123456',database:'2017'});
//默认端口3306可以不写
//node的mysql模块是客户端
console.log(db)

//查询query(干啥，回调)

db.query('SELECT * FROM `user_table`;',(err,data)=>{
	if(err){
		console.log('出错')
	}else{
		console.log(data)
	}
})

SQL语句：Structured Query Language(结构化查询语句)

SQL本身就是一个极其庞大的话题--DBA职业

标准写法
关键字大写
库名、表名、字段需要加上反单引号``

4大查询语句---增删改查

增--INSERT
	INSERT INTO 表(字段列表)  VALUES(值列表)
	INSERT INTO user_table(`ID`,`username`,`pass`) VALUES(0,'blue','1233')
	id给个0是因为ID是自增的
删-DELETE
改-UPDATE
查-SELECT
	SELECT 什么 FROM 表
	SELECT * FROM `user_table`;选择user_table下所有数据;

queries查询右击新建查询粘贴一下运行：
INSERT INTO `user_table` (`ID`,`username`,`pass`) VALUES(0,'blue','123');


---------------------------------------------


总结：
1.下载mysql模块(client)
2.连接
	mysql.createConnection({host,port,user,pass,database})
3.查询
	db.query(SQL,(err,data)=>{
		if(err){
			console.log('出错了')
		}else{
			console.log(data)
		}
	})

	db.query('SELECT * FROM `user_table`',(err,data)=>{
		if(err){
			console.log('出错')
		}else{
			console.log(data)
			//把数据转化成json,可直接发给前台
			console.log(JSON.stringify(data));
		}
		})
4.SQL语句
	增删改查
