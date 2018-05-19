const express=require('express');

module.exports=function(){
	var router = express.Router();

	router.get('/',(req,res)=>{
		res.send('Administrator').end();
	})

	//拦截所有的请求
	router.use((req,res,next)=>{
		if(!req.session['admin_id'] || req.url != 'login'){
			res.redirect('/admin/login')
		}else{
			next();
		}
	})

	return router;
}

