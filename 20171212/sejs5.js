const ejs = require('ejs')

ejs.renderFile('./views/5.ejs',{
	type:'admin'
},function(err,data){
	console.log(data)
})