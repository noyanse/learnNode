const fs = require('fs')

//fs中rename有三个参数,原来的名字，新名字，回调

fs.rename('a.txt','b.txt',function(err){
	console.log(err)
})