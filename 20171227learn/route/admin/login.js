const express=require('express');
const common=require('../../libs/common');
const mysql=require('mysql');

var db=mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'learn'
})

module.exports=function(){
	var router=express.Router();
	//如果get请求就显示登录页
	router.get('/',(req,res)=>{
		res.render('admin/login.ejs',{});
	});
	//如果是post请求就处理数据
	router.post('/',(req,res)=>{
		//获取post数据
		var username = req.body.username;
		var password = common.md5(req.body.password+common.MD5_SUFFIX);
		//查看数据库密码和输入密码是否一致
		db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
			if(err){
				console.log(err);
				res.status(500).send('database err').end();
			}else{
				if(data.length==0){
					res.status(400).send('no admin').end();
				}else{
					if(data[0].password==password){
						//成功
						req.session['admin_id']=data[0].ID;//获取cookie
						// res.send('ok')
						res.redirect('/admin');//重定向到admin页面

					}else{
						//用户名与密码不匹配
						res.status(400).send('uncorrect').end();
					}
				}
			}
		})
	})

	return router;
}