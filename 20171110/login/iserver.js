const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var users = {};

var server = http.createServer(function(req,res){
	//解析数据
	var str = '';
	req.on('data',function(data){
		str += data;
	});
	req.on('end',function(){
		var obj = urlLib.parse(req.url,true);
		const url = obj.pathname;
		const GET = obj.query;
		const POST = querystring.parse(str);
		//判断请求的是文件还是接口
		if(url == '/user'){    //接口
			//判断是什么行为
			switch(GET.act){
				case 'reg'://如果是注册
					//判断是否已经注册过，如果没注册过，把数据填到users中
					if(users[GET.user]){
						res.write('{"ok": false, "msg": "此用户已存在"}');
					}else{
						users[GET.user] = GET.pass;
						res.write('{"ok": true, "msg": "注册成功"}');
					}
					break;
				case 'login'://如果的登录
					//判断用户名是否存在
					if(users[GET.user] == null){
						res.write('{"ok": false, "msg": "此用户不存在"}');
					}else if(users[GET.user] != GET.pass){
					//判断密码是否正确,如果不对，弹出错误
						res.write('{"ok": false, "msg": "用户名或密码有误"}');
					}else{
						res.write('{"ok": true, "msg": "登录成功"}');
					}
					break;
				default:
					res.write('{"ok": false, "msg": "未知的act"}');
			}
			res.end();
		}else{//文件
			var file_name = './www' + url;
			fs.readFile(file_name,function(err,data){
				if(err){
					res.write('404')
				}else{
					res.write(data)
				}
				res.end();
			})
		}
		
	})
})
server.listen(8080)