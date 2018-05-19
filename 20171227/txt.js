数据库导入导出：
导出：转储SQL文件--结构和数据
导入： 要先新建一个库--运行SQL文件

-------------------------------------

GROUP--合并
统计每个班的平均分

步骤：
以班级为单位合并,AVG()平均分
·SELECT class,AVG(score) FROM student_table GROUP BY class;


每个班级最高最低
·SELECT class,MAX(score),MIN(score) FROM student_table GROUP BY class

---------------------------------------------------------

每个人消费总额：总价SUM
SELECT name,SUM(price) FROM sales_table GROUP BY name;

总价按照升序排列
SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC;

----------------------------------------------------------

子句：
LIMIT限制输出--适合做分页
小问题：什么时候需要它

分页方式：
1.所有数据给前端，10个一组...
2.后台只给一丁点数据

*在淘宝上用第一种方式不行，数据量太大

LIMIT 10; 要前十条
LIMIT 5,8; 从第5条开始要8个

做分页：每页20条数据

第一页：0,20 0---19
第二页：20,20 20--39

##子句之间是有顺序的
WHERE GROUP ORDER LIMIT

SELECT class,COUNT(class) FROM student_table
WHERE score>60-----------------筛选
GROUP BY class-----------------合并
ORDER BU COUNT(class) DESC------排序
LIMIT 2;------------------------只要两条


--------------------------------------------------------
--------------------------------------------------------
--------------------------------------------------------


官网----响应式
	##规划：
	1.数据字典
	2.后台,业界主流用前台渲染，所以留后台接口，静态资源
	3.angular

数据字典：
1.首页
	banner
	产品介绍
	用户评价
2.技术
	
3.about

4.blog

5.contact
	地址
	发送联系消息

------------------------------------------

真正的数据字典：
1.banner_table 焦点图表
2.intro_table 产品介绍表
3.custom_evaluation_table 用户评价表
4.news_table 新闻表
5.blog_table 博文表
6.contact_table 地址表
7.msg_table 发送信息表
8.aboutus_table 关于我们表

------------------------------------------
------------------------------------------
------------------------------------------
定义：
url   300字

--------------

*banner_table
ID
title		varchar(32)
description	varchar(300)
href(view more链接查看更多) varchar(300)

-------------------------------------------

*intro_table
ID
title 		varchar(32)
description	varchar(200)
href		varchar(300)

-------------------------------------------

*custom_evaluation_table
ID
title 		varchar(32)
description varchar(200)
src 		varchar(300)

-------------------------------------------

*news_table
ID
title	varchar(100)
summary	varchar(500)
href	varchar(300)
ico_src varchar(300)
big_pic_src varchar(300)
content text

-------------------------------------------

*blog_table
ID
title		varchar(100)
pic_src 	varchar(300)
pic_big_src varchar(300)
summary 	varchar(500)
content 	text
post_time 	timestamp
author		varchar(32)
n_view		int


-------------------------------------------

*contact_table
ID
street	varchar(50)
phone	varchar(20)
fax		varchar(20)
email	varchar(32)
weibo	varchar(40)
wx		varchar(40)
map?		?

-------------------------------------------

*msg_table
ID
name	varchar(16)
email	varchar(64)
phone	varchar(20)
subject	text


-------------------------------------------

*aboutus_table
ID
title		varchar(200)
content 	text
pic_src 	varchar(300)
href 		varchar(300)

-------------------------------------------

admin_table 管理员用户表
ID
username varchar(32)
password varchar(32)



没有产品经理，就自己定了。。。