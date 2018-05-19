const crypto=require('crypto');

var obj=crypto.createHash('md5');

obj.update('2018')

var str=obj.digest('hex');//以数字的形式获取结果
//hex是十六进制
console.log(str)