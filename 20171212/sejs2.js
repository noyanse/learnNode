const ejs = require('ejs')

ejs.renderFile('./views/2.ejs',{json:{arr:[
	{user:'blue',pass:'123'},
	{user:'qw',pass:'34'},
	{user:'dfd',pass:'5'}
]}},function(err,data){
	console.log(data)
}) 