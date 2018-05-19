const express=require('express');
//const bodyParser = require('body-parser')
const myBodyParser = require('./my-body-parser');
var server = express();
server.listen(8080);

//get
/*server.use('/',function(req,res){
	console.log(req.query)
})*/
//post
server.use(myBodyParser);

// server.use(bodyParser.urlencoded({

// }));
server.use('/',function(req,res){
	console.log(req.body);//POST
})

