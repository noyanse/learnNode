var http = require('http');
var querystring = require('querystring');
//url
http.createServer(function(req,res){
	var str = "";//接收数据
	var i = 0;
	req.on('data',function(data){
		console.log(`这是第${i++}次发送数据`)
		str += data;
	});
	req.on('end',function(){
		var POST = querystring.parse(str);
		console.log(POST)
	})
}).listen(8081)