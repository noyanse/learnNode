const mysql = require('mysql');

//连接
var db=mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'user'})

console.log(db);

//查询
db.query('SELECT * FROM `user_table`',(err,data)=>{
	if(err){
		console.log('出错')
	}else{
		// console.log(data)
		console.log('成功了')
		console.log(JSON.stringify(data));
	}
})
