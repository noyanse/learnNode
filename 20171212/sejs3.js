const ejs = require('ejs')

ejs.renderFile('./views/3.ejs',{},function(err,data){
	console.log(data)
}) 