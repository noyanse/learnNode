const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const urlLib=require('url');

var users = {};//模拟数据，把接收到的东西放到这里

var server = http.createServer(function(req,res){
	//解析数据
	var str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(){
		var obj = urlLib.parse(req.url,true);
		const url = obj.pathname;
		const GET = obj.query;
		const POST = querystring.parse(str);

		
		//区分访问文件还是接口
		if(url == '/user'){  //接口
			switch(GET.act){
				case 'reg':
		          //1.检查用户名是否已经有了
		          if(users[GET.user]){
		            res.write('{"ok": false, "msg": "此用户已存在"}');
		          }else{
		            //2.插入users
		            users[GET.user]=GET.pass;
		            res.write('{"ok": true, "msg": "注册成功"}');
		          }
		          break;
				case 'login':
				//检查用户是否存在
					if(users[GET.user] == null){
						res.write('{"ok":false,"msg":"此用户不存在"}')
					}else if(users[GET.user] != GET.pass){
						//检查密码是否正确
						res.write('{"ok":false,"msg":"用户名或密码错误"}')
					}else{
						res.write('{"ok":true,"msg":"登录成功"}')
					}
				
					break;
				default:
					res.write('{"ok":false,"msg":"未知的act"}')	

			}
			res.end()

		}else{				//文件
			//读取文件
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
server.listen(1377)