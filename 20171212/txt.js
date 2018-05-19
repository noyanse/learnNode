jade:

在jade中写if代码
1.jade:
html
	head
	body
		-var a=12;
		-if(a%2==0)
			div(style={background:'red'}) 偶数
		-else
			div(style={'background:'blue'}) 基数

sjade1.js
const jade = require('jade')
console.log(jade.renderFile('./views/1.jade',{pretty:true}))

在jade中写switch代码
2.jade:
html
	head
	body
		-var a=12;
		case a
			when 0
				div aaa
			when 1
				div bbb
			when 2 
				div ccc
			default
				|不靠谱 

				// |竖线表示原样输出

只要前面是代码 后面一直是代码
 就不用在前面加很多的- 横杆



 ejs:非破坏式
 1.ejs:


输出:
<%= name %> 输出变量
<%= json.arr[0].name %> 输出json
<%= 12+5 %> 输出数字

<%= %> 等号是转义输出
<%- %> 减号是不转义输出

其他的和js一样

但凡ejs输出undefind，意味着出错了


include：

<% include ../a.txt %> 上一级

包裹在for循环中：

<% for(var i=0;i<5;i++){ %>

<% include ../a.txt %>

<% } %>

//a.txt的内容被输出了5次


引入不同的头：

include不是js语句

<% if(type=='admin'){ %>
<%	include ../style/admin.css %>
<% }else{ %>
<%	include ../style/user.css %>
<% } %>

include后面不能写变量,只能在外面判断，里面必须写死的