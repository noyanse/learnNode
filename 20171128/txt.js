
jade:
1.根据缩进来规定层级
2.属性 逗号分隔
3.内容 空一格格 直接往后写
	<script src="a.js"></script>
	src属性怎么表示
		script(src='a.js')
	多个属性：
		link(href="a.css",rel="stylesheet")
		input(type="text",id="txt1",value="a")
		input(type="text",id="txt2",value="a")

2.jade：
	html
		head
			link(href="a.css",rel="stylesheet")		
				body
					input(type="text",id="txt1",value="a")
					input(type="text",id="txt2",value="a")
					div
						ul
							li

const jade = require('jade')
const fs = requre('fs')

var str = jade.renderFile('./views/1.jade',{pretty:true})

fs.writeFile('./build2.html',str,function(err){
	if(err){
		console.log('写入失败')
	}else{
		console.log('写入失败')
	}
})

//把1.jade里面的东西写成html形式写入build.html


//内容
script 

div aaa
	span bbb

特殊的
style
	1.普通属性写法
		div(style="background:red;color:#fff;")
	2.json形式，变量传进来时方便
		div({style={background:'red',color:'#fff'})
		*只有属性时style时才能解析json
class
	1.普通属性写法
		div(class="aaa bbb ccc")
	2.数组,如果是动态的，数组更方便
		div(class=['aa','bbb','bbb'])

简写:
div.box
div#box

属性的其他写法
正常的：div(title="aa",id="bbb")

在后面加个&attributes可以把属性变成json
只有配合起变量才有意义
div&attributes({title:'aaa',id:'bbb'})

------------------------------------------------
总结：
模板引擎：生成页面
1.jade:破坏式的
	根据缩进划分层级
	属性用()表示，用逗号分隔
		style={}
		class=[]
	内容
		div xxx
			span xxx
				a(href="xxx") 连接
-------------------------------------------
jade.render('字符串')
jade.renderFile('模板文件名',{pretty:true})

jade 可以自动识别单双标签

允许自定义标签，所有的自定义标签都是双标签

|竖线表示原样输出

script 
	|window.onload = function(){
	|	var oBtn = document.getElementById('btn')
	|}
更简单的方法:
script.加个点表示原样输出
.表示所有下一级的内容原样输出

更更方便的:
script
 include a.js

变量:
div 我的名字:#{name}
简化 div=name 直接一个等号
var str = jade.renderFile('./views/1.jade',{pretty:true,name:'blue'})

var str = jade.renderFile('./views/1.jade',{pretty:true,
	json:{width:'200px',height:'200px'},
	arr:['aa','bbb','ccc']
})

div(style=json)
div(class=arr)

div(class=arr)
div(class=arr class="active")
div(class=arr)
div(class=arr)
div(class=arr)

在jade中加上-意味着我是一段代码
-var a = 12


循环生成东西
jade
-for(var i=0;i<arr.length;i++)
	div=arr[i]
server.js
const jade = require('jade')

console.log(jade.renderFile('./views/3.jade',{pretty:true,
	arr:['aa','bb','ss','ff']
}))


-----------------------------------------------------

20171212

sjade1.js:
	const jade = require('jade')
	console.log(jade.renderFile('./views/4.jade',{pretty:true,
		content: '<h2>你好啊</h2><p>eferrrr</p>'
	}))
4.jade:
	html
		head
			body
				div=content
效果会把标签转义
---------------------------------------
	html
		head
			body
				div!=content
加个感叹号就不会把标签转义了


注入式攻击

