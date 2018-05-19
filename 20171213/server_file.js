const express=require('express')
const bodyParser=require('body-parser')
const multer=require('multer')
const fs=require('fs')
const pathLib=require('path')

//需要先var一个multer对象,把文件保存的地址
// var objMulter=multer()//buffer是文件的内容
// 极大的占用内存，所以希望能把文件写到磁盘里
var objMulter=multer({dest:'./www/upload/'})

var server = express()

//错误
// server.use(bodyParser.urlencoded({extended:false}))

// server.use(objMulter.single('fl'))//single只接受一个文件
server.use(objMulter.any())
server.post('/',function(req,res){
	// console.log(req.body)//上传的只是文件名
	//console.log(req.files)
//新文件名：'./www/upload/afrgtrg' + '.png'
	//重命名上传的文件：
	//1.获取原始文件扩展名
		//获取原来的文件名字path + ext
		console.log(req.files)
		console.log(req.files[0].originalname)
		
	//2.重命名临时文件
	var newname = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
	fs.rename(req.files[0].path,newname,function(err){
		if(err){
			res.send('上传失败')
		}else{
			res.send('成功')
		}
	})
})

server.listen(8081)