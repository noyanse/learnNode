const querystring = require('querystring');

module.exports = function(req,res,next){
	var str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(){
		req.body = querystring.parse(str);
		next();
	})
}

//引用：const myBodyParser=require('my-body-parser')
//myBodyParser


/*
module.exports = function(){
	return:function(req,res,next){
		var str = '';
		req.on('data',function(data){
			str += data;
		})
		req.on('end',function(){
			req.body = querystring.parse(str);
			next();
		})
	}
	
}

//myBodyParser()

*/