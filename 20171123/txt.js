
cookie:
	空间小---省着用
	安全性差---校验cookie是否被篡改过

发送cookie
	req.secret = '密钥';
	res.cookie(名,值,{path:'/',maxAge:毫秒,signed:true})
读取cookie
	server.use(cookieParser('密钥'));
	server.use('/',function(req,res){
		req.cookies//未签名
		req.signedCookies//签名的
	})
删除cookie
	res.clearCookie('名字')
	server.use('/',function(req,res){
		res.clearCookie('user')
		res.send('ok')
	})

cookie也可以加密
cookie-parser
cookie-encrypter//对cookie进行加密解密


server.listen(8080)
session----cookie-session
强制要求keys,在server上加
//第一次访问用aaa，第二次用bbb
//server.keys = ['aaa','bbb','ccc'];//不知道多少个密钥，循环着使用
const cookieSession = require('cookie-session')
server.use(cookieParser());
server.use(cookieSession(){
	name: 'sss',//session的名字可以改
	keys: ['aaa','bbb','ccc'],
	maxAge: 2*3600*1000//有效期2小时,越短安全性越高
});
server.use('/',function(req,res){
	//访问网站的次数
	if(req.session['count'] == null){//第一次访问
		req.session['couunt'] = 1;
	}else{
		req.session['count']++
	}
	console.log(req.session['count']);//进来的信息

	res.send('ok')
}) 

sessionid是不会变的
session_sig----签名，防止篡改，会改变

session劫持


--------------------------------

cookie-session
var arr = [];
for(var i = 0; i < 100000; i++){
	arr.push('sig_'+Math.random());
}
server.use(cookieParser())
server.use(cookieSession({
	keys: []
}))
server.use('/',function(req,res){
	req.session
})
delete req.session


----------------------------------

总结：
cookie -- 存在浏览器 4k 不安全
	签名，加密
	存在客户端的东西都不安全

session -- 存在服务器
	不能独立存在，基于cookie

server.use(cookieParser('签名'))
server.use(cookieSession({

}))
server.use('/',function(req,res){
	// res.secret可以省略
	//cookie 设置
	res.cookie(名字，值，{signed:true})
	//cookie 读取cookie里面的东西
	res.cookies['user']
	//cookie 清除
	res.clearCookie('名字')
	//cookie是浏览器上的用delete删不掉

	//session 
	res.session['xxx']
	delete res.session
	//delete删掉的是node服务器上的东西
})

明天:模板
