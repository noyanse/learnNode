const express=require('express');
const common=require('../libs/common');
const mysql=require('mysql');

var db=mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'learn'

})

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


	//进入login页面render就login.ejs
	//如果是get请求就显示登录页
	router.get('/login',(req,res)=>{
		res.render('admin/login.ejs',{})
	})
	//如果是Post请求就处理数据
	router.post('/login',(req,res)=>{
		var username=req.body.username;
		var password=common.md5(req.body.password+common.MD5_SUFFIX);

		db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
			if(err){
				res.status(500).send('err').end();
			}else{
				if(data.length==0){
					res.status(400).send('no admin').end();
				}else{
					if(data[0].password==password){
						//成功
						req.session['admin_id']=data[0].ID;
						res.redirect('/admin');
					}else{
						res.status(400).send('uncorrect').end();
					}
				}
			}
		})
	})
	router.get('/',(req,res)=>{
		// res.send('恭喜您成功登录').end();
		res.render('admin/index.ejs',{})
	})

	//需要内容变化
	router.get('/banners',(req,res)=>{
		//修改删除,判断act是哪个决定删还是改
		//如果什么都没传，那就正常渲染default

		switch(req.query.act){
			case 'mod':
				db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`,(err,data)=>{
					if(err){
						console.log(err);
						res.status(500).send('database err').end();
					}else if(data.length==0){
						res.status(404).send('data not found').end();
					}else{
						db.query(`SELECT * FROM banner_table`,(err,banners)=>{
						if(err){
							console.log(err);
							res.status(500).send('database err').end();
						}else{
							res.render('admin/banners.ejs',{banners,mod_data:data[0]})
							}
						});
					}
				})
				break;
			case 'del':
				db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
					if(err){
						console.log(err)
						res.status(500).send('database err').end();
					}else{
						res.redirect('/admin/banners')
					}
				})
				break;
			default:
				//从数据库中获取banner并呈现出来
				db.query(`SELECT * FROM banner_table`,(err,banners)=>{
					if(err){
						console.log(err);
						res.status(500).send('database err').end();
					}else{
						res.render('admin/banners.ejs',{banners})
					}
				})
				break;
		}
		
		
	})

	//banners添加到数据库
	router.post('/banners',(req,res)=>{
		
		//取的是banners.ejs中的数据
		var title=req.body.title;
		var description=req.body.description;
		var href=req.body.href;


		//做个粗略的校验,想做的全得用正则
		if(!title || !description || !href){
			res.status(400).send('arg error').end();
		}else{
			if(req.body.mod_id){//修改
				db.query(`UPDATE banner_table SET \ 
					title='${req.body.title}',\
					description='${req.body.description}',\
					href='${req.body.href}'\
					WHERE ID=${req.body.mod_id}
					`,(err,data)=>{
						if(err){
							console.log(err);
							res.status(500).end();
						}else{
							res.redirect('/admin/banners');
						}
					})
			}else{//添加
				db.query(
					`INSERT INTO banner_table(title,description,href) VALUES('${title}','${description}','${href}')`,
					(err,data)=>{
						if(err){
							console.log(err);
							res.status(500).send('database error').end()
						}else{
							res.redirect('/admin/banners')
						}
				})
			}			
		}
	})

	return router;
}
