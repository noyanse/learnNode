const jade = require('jade')
const fs = require('fs')

// var str = jade.render('html')

// var str = jade.renderFile('./views/1.jade',{pretty:true,name:'blue'})
//var str = jade.renderFile('./views/1.jade',{pretty:true,a:12,b:5})

var str = jade.renderFile('./views/1.jade',{pretty:true,
	json:{width:'200px',height:'200px'},
	arr:['aa','bbb','ccc']
})


//调试的阶段加上pretty方便，真正发布的时候不加.


//把1.jade编译后的内容写入1.html
// fs.writeFile('./build/1.html',str,function(err,data){
// 	if(err){
// 		console.log('写入失败')
// 	}else{
// 		console.log('写入成功')
// 	}
// })

console.log(str);



//直接cmd运行node

// 2017.11.29
// 昨天整了一下午的服务器也没成功
// 今天终于把IPV6给整好了
// 希望搭建SSR顺利