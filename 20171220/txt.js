Node本身不支持mysql
要下载模块mysql模块
npm.taobao.org


设计模式要掌握的：
工厂 单例 观察者 等

软件工程


博客：

数据字典--数据定出来
	后台一般以秒做单位，前台一般以毫秒做单位
1.banner相关数据banner_table
	ID
	title 标题       varchar(32)最多32个
	sub_title 副标题 varchar(16)
	src 图片地址	 varchar(64)
2.文章数据 article_table
	ID
	author 作者           varchar(16)
	author_src 作者头像   varchar(64)
	title 标题			  varchar(32)
	post_time 发布时间(s) int
	content 内容		  text
	n_like 赞			  int
3.用户数据 user_table
	ID
	username 用户名 varchar(32)
	password 密码	varchar(32)
	src      头像	varchar(64)

接下来用navcaitor创建数据库
新建库blog:
	新建表 banner相关数据banner_table:
	ID int 勾 钥匙
	title varchar32 
	sub_title varchar16 
	src varchar64
注释：是给人看的
以下一样建立