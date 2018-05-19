const express=require('express');
const common=require('../../libs/common');
const mysql=require('mysql');

module.exports=function(){
	var router=express.Router();

	//检查登录状态
		//登录之后给一个session
		//只要访问admin就归我管
	router.use((req,res,next)=>{//拦截所有的请求
		//没登录的情况下就只能访问login页面
		if(!req.session['admin_id'] && req.url!='/login'){//没有登录
			//重定向
			res.redirect('/admin/login');
		}else{
			next();
		}
	})

	router.get('/', (req,res)=>{
		res.setHeader('content-type', 'text/html;');
		res.render('admin/index.ejs',{})
	})
	router.use('/login/',require('./login')());

	router.use('/banners/',require('./banner')());
	
	router.use('/custom/',require('./custom')());

	

	return router;
}
