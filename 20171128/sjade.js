const jade = require('jade')

console.log(jade.renderFile('./views/3.jade',{pretty:true,
	arr:['aa','bb','ss','ff']
}))