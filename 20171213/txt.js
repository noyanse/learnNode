express：
1.主体
2.cookie,session
3.数据
4.模板引擎


//规划
//1.解析cookie
//2.使用session
//3.post数据
//4.配置模板引擎
//5.static数据

bodyParser不好
body-parser只能解析数据类的post
解析不了文件上传

解决办法：
在upload.html的form中加上enctype属性
enctype属性有三个值：
1.application/x-www-form-urlencoded
只能上传值
2.multipart/form-data
分成多个部分，文件上传处理不了
3.text/plain
纯文本

multer中间件，用来处理multipart/form-data
var objMulter=multer({dest:'./www/upload/'})
// server.use(objMulter.single('fl'))//single只接受一个文件
server.use(objMulter.any())//接受任意文件
//文件名乱掉了，给改个名字，需要引入fs模块
./www/upload/dwaefregfregf ---原来的
改名
./www/upload/dwaefregfregf.png ---改成这个
怎么重命名
const fs = require('fs')
//fs中rename有三个参数,原来的名字，新名字，回调

fs.rename('a.txt','b.txt',function(err){
	console.log(err)
})

重命名的步骤：
1.获取原始文件的扩展名
const path=require('path')
var str = 'c:\\wamp64\\www\\a.html';
var obj = path.parse(str)//path解析文件路径
// 解析完后的属性
//base：文件名部分
//ext：扩展名部分
//dir:文件路径
//name：文件名，不包含扩展名
获取扩展名的话就是obj.ext
console.log(obj)

2.重命名临时文件
var newname = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
fs.rename(req.files[0].path,newname,function(err){
	if(err){
		res.send('上传失败')
	}else{
		res.send('成功')
	}
})

req.files[0].path//原来文件的名
originalname//原来文件的名字
pathLib.parse(req.files[0].originalname).ext//获取文件的扩展名

POST有两种用途
1.上传数据，比如用户名密码
2.专门用来接收上传的文件

req.body得到的是值
req.files得到上传的文件


-----------------------------------------

总结

body-parser 解析post普通的数据  
multer      解析post文件的数据
body-parser 如果表单enctype编码方式是application/x-www-form-urlencoded,平时不加是因为默认
就是这个
multer  multipart/form-data
用法：var obj=multer({dest:上传路径})
server.use(obj.single(文件名))//只接受一个文件
server.use(obj.any())//接受任意文件
server.use(function(req,res){
	req.files//本身是个数组
	req.files[0].originalname
	req.files[0].path文件路径
})

把扩展名加上

var newname = file.path+pathLib.parse(file.originalname).ext

fs.rename(旧名，新名，回调)