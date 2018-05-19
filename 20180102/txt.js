后台管理页面：
banner页面：
在banners.ejs中写入form表单用post提交到本页面,
再用table呈现添加的表单
后台admin.js中先用router.post把前台的数据获取并添加到数据库，
然后再用router.get从数据库中获取数据并render到本页面
banners.ejs:
<div class="page">
	<% include components/top.inc.ejs %>
	<div class="content-wrap">
		<div class="add">
			<!-- ?表示提交到当前页 -->
			<form action="?" method="post">
				标题：<input type="text" name="title"><br>
				描述：<textarea name="description" cols="30" rows="5"></textarea><br>
				链接：<input type="text" name="href"><br>
				<input type="submit" value="添加">
			</form>
			
		</div>
		<table border='1' width="100%" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th>ID</th>
					<th>标题</th>
					<th>描述</th>
					<th>链接</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<% for(var i=0;i<banners.length;i++){ %>
				<tr>
					<td><%= banners[i].ID %></td>
					<td><%= banners[i].title %></td>
					<td><%= banners[i].description %></td>
					<td><%= banners[i].href %></td>
					<td>
						<a href="">修改</a>
						<a href="">删除</a>
					</td>
				</tr>
				<% } %>
			</tbody>
		</table>
		<div>修改</div>
	</div>
	</div>


admin.js:
router.get('/banners',(req,res)=>{
	//从数据库中获取banner并呈现出来
	db.query(`SELECT * FROM banner_table`,(err,banners)=>{
		if(err){
			console.log(err);
			res.status(500).send('database err').end();
		}else{
			res.render('admin/banners.ejs',{banners})
		}
	})
	
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
})


--------------------------------------------------------

完了之后解决修改删除功能：


<a href="?act=mod&id=<%=banners[i].ID%>">修改</a>
<a href="?act=del&id=<%=banners[i].ID%>" 
	onclick="return confirm('确定删除吗')">删除
</a>

act在get下

修改和添加是差不多的逻辑
修改有一个原始ID
如果是修改状态，要先获取数据

router.get('/banners',(req,res)=>{
	//修改删除,判断act是哪个决定删还是改
	//如果什么都没传，那就正常渲染default

	switch(req.query.act){
		case 'mod'://修改

			break;			
		case 'del'://删除
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


router是写大型项目必备的
可以把admin.js中的很多部分都分出去
login 部分
banners部分
只需require进来模块，方便合作工作
admin.js:
router.use('/login',require('./login')());
router.use('/banners',require('./banners')());

login.js:
const common=require('../libs/common');
const mysql=require('mysql');
var db=mysql.createPool({
	post: 'localhost',
	user: 'root',
	password: '123456',
	database: 'learn'

})

module.exports=function(){
	var router=express.Router();
	router.get('/',(req,res)=>{
		...
	})
	router.post('/',(req,res)=>{
		...
	})
	return router;
}