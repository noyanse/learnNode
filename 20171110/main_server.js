const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');
var server = http.createServer(function(req,res){
	//GET
	var obj = urlLib.parse(req.url);
	var url = obj.pathname;
	var GET = obj.query;
	//POST
	var str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(){
		const POST = querystring.parse(str);
		console.log(url,GET,POST)
	})
	//文件请求
	var file_name = './www' + url;
	fs.readFile(file_name,function(err,data){
		if(err){
			console.log('404')
		}else{
			res.write(data)
		}
		res.end();
	})
	//把要请求的文件放在www目录下，在浏览器中输入要请求的文件a.html:localhost://8080/a.html
});
server.listen(8080)