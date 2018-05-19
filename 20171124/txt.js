模板引擎
	渲染页面的
主流两个
1.jade
	破坏式（侵入式），强依赖，
2.ejs
	非侵入式，并不破坏原有的html,css，只是在里面加东西
	弱依赖

***jade:
npm install jade

const jade = require('jade');

var str = jade.render('html')

console.log(str)//<html></html>

html ---- <html></html>


//读文件
var str = jade.renderFile('1.jade',{pretty:true})



新建1.jade
	html
		head
			style
				body
					div
						ul
							li


***ejs:
npm install ejs
const ejs= require('ejs')
ejs.renderFile('1.ejs'，{name: 'lulu'}，function(err,data){
	if(err){
		console.log('编译失败')
	}else{
		console.log(data)
	}
})
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>

	<%= a %> //ejs是非破坏式，可以直接输出变量
	我的名字叫<%= name %>
</body>
</html>

我喜欢ejs
-------------------------------------------

