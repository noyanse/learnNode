8
###自定义模块

>模块组成
NPM
发布自己的模块

######模块组成
自定义mod.js
1.js使用自定义的mod.js
//require  请求：引用模块
//module 模块
//exports 输出
mod.js
	var a = 12;
	exports.a = 12;
1.js:
	const mod1 = require('./mod.js')
	.js可以选择不要
	const mod1 = require('./mod')

	console.log(mod1.a)
*以前的当前目录没有区别:*
<img src="1.jpg"/>
<img src="./1.jpg"/>

nodejs的特点：
* require 引用系统模块 require('http')
* require 引用自己的模块 require('./mod')

*对外输出东西，必须加给exports*

- nodejs里面没有全局变量
- 不管自定义模块怎么写，
node会帮你把东西包在一个函数里面
```
(function (require,exports,module) {
	// body...
})()
```
**exports//一个一个输出**
```
exports.a=12;
exports.b=2;
exports.c=1;
```
**module//批量输出**
```
module.exports={a:12,b:2,c:1};
```
对外输出东西两种方法
*1
	exports.xxx = ??;
	exports.xxx = ??;
	exports.xxx = ??;
2*
	module.exports={
		xxx:??,
		xxx:??,
		xxx:??
	}

----------------------------------------

`require` ---- 引入其他模块
`exports` ---- 一个一个输出
`module` ------- 批量输出

`console.log(module.exports == exports)//true`

--------------------------------------

######NPM ：NodeJs Package Manage(NodeJs包管理器)

- 1.统一下载途径

- 2.自动下载依赖
	比如下载mysql，会把依赖也下载了
		npm install mysql

* 把自定义的模块放进node_modules目录下
就不用加./了 	`require('mod')`

**require总结：**
1.加./,如果有./只从当前目录找
2.模块放进node_modules中，如果没有./，从系统模块
中找，和node_modules中找
*优先级:*
	系统模块 > node_modules文件夹
*自定义模块统一放到node_modules中*

----------------------------------------

###总结:
######模块里面
	require---引入
	exports---输出
	module.exports---批量输出
######npm
	帮助下在模块
	自动解决依赖
######node_modules
	模块放这里，不用加./

-------------------------------------

######发布自己的模块
- npm中的命令
www.npmjs.com官网,去官网注册账号
要有npm账号，然后可以上传自己的模块
`npm login`
	用户名
	密码
	Email
`npm whoami` 我叫什么

- 提交模块
	npm init 初始化
	name:test122(名)
	version:(1.0.0)
	description:这是个测试包，千万别下,
	entry point:(index.js)
	test command:
	git repository:git地址
	keywords:test 12 33
	author:noyanse
	license:(ISC)

	ok

	*本地文件夹下多了一个package.json*
	- 是一个描述文件
	然后新建index.js
		exports.sum = function(){
			var res = 0;
			for(var i = 0;i < arguments.length;i++){
				res += arguments[i];
			}
			return res;
		}
	上传
		npm publish

	下载模块
	 npm install test122
	 引用
	 	const test122 = require('test122');
	 	console.log(test122.sum(12,34,45));

	 	index.js中添加方法
	 	exports.div = function(a,b){
	 		return a/b;
	 	}

	 	在用的人没办法用div的方法，因为还没有上传
	 	npm publish上传出错
	 	因为版本已经发布了，只要在package.json中
	 	升个版本号
	 	npm update test122直接更新

	 	删除已经上传的模块
	 		npm unpublish
	 		npm --force unpublish
	 	得一个版本一个版本的删，并非一起删
	 	包不能随便乱删，也不能随便乱发
	 	实在删不了，可以通过发邮件删除

- 包管理工具，写自己的模块
npm init
npm publish
npm --force unpublish


-----------------------------------------------
-----------------------------------------------
-----------------------------------------------

###express框架
>1.安装
2.配置
3.如何接收请求
4.如何响应数据

######安装
	`npm install express`
	慢的话用cnpm install express
- 新建server.js
const express = require('express');//引用
var server = express();//已经创建好服务了

server.use('/',function(req,res){
	当用户请求根目录的时候
	res.send('abc');//和原来的write()差不多
	res.end();
});
server.use('/b.html',function(req,res){
	当用户请求`b.html`的时候
	res.send('123');//和原来的write()差不多
	res.end();
});


server.listen(8080);//监听

非侵入式(并不标准)
并非原生的，原生的功能都保留，又添加了一些功能
res.write()
res.end()

express:
*res.send()//多了一个send()
	send比write多了一些功能
	//send()可以发送json
	res.send({a:12,b:5})

res.write()
	//用write发送不了json，只能发字符串和buffer
	
res.end()

express保留了原生的功能，添加了一些方法(send)
增强原有的功能。

步骤：
1.创建服务
	var server = express();
2.监听
	server.listen(8080)
3.处理请求
	server.use('地址',function(req,res){
		增强版req和res
	})

----------------------------------------------

3种方法
.get('/',function(req,res){})//接受get请求
.post('/',function(req,res){})//接受post请求
.use('/',function(req,res){})//通吃，get,post都能接受


用express做注册登录
server.js
 const express = require('express');
 //const expressStatic = require('express-static')
 var server = express();
 server.listen(8080);

//用户数据users
var users = {
	'blue':' 123',
	'zhanf': '2333',
	'li': 'www'
};


server.get('/login',function(req,res){
	//req.query;//就收get请求
	var user = req.query['user'];
	var pass = req.query['pass'];

	if(users[user] == null){//此用户不存在
		res.send({ok: false, msg: '此用户不存在'})
	}else{
		if(users[user] != pass){
			res.send({ok: false, msg: '密码错了'})
		}else{
			res.send({ok: true, msg: '成功'})
		}
	}
})



server.use(expressStatic('./www'));//在哪个文件夹下读取静态文件
// server.use(express.static(path.join(__dirname, 'www')))

-----------------------------------------------------
 //如果前台要a.html
 server.get('/a.html',function(){

 })

express中间件也就是插件
 cnpm install express-static
 专门处理静态文件

接口
/login?user=xxxpass=xxx
返回的：=>{ok:true/false,msg:'原因'}

express框架：
1.依赖中间件
2.接受get请求get/post/user
get('/地址',function(req,res){

})
3.非破坏式
