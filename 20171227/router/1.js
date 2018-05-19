const express=require('express');

module.exports=function(){
	var router=express.Router();

	router.use('/1.html',function(req,res){
	res.send('我是111文章').end();
	})
	router.use('/2.html',function(req,res){
		res.send('我是222文章').end();
	})
	return router;
}