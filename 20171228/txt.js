管理员没有注册这一说
拖库(数据库) 把数据库都拖走了
数据csdn丢失
京东
小米 
都有数据丢失

几乎所有的网站用的都是一个用户密码

数据库中不能存明文的密码
加密（签名）之后存储

MD5 签名算法


-------------------

在数据库admin_table中添加一条数据
blue
密码用md5加密

crypto加密

用MD5加密

用MD5加密，解密

作用就是让用户看不到明文

const crypto=require('crypto');

var obj=crypto.createHash('md5');

obj.update('123456')

var str=obj.digest('hex');//以数字的形式获取结果
//hex是十六进制
console.log(str)

封装成一个模块:
const crypto=require('crypto');
module.exports={
	//这东西不能丢
	MD5_SUFFIX:'ergveringnvginbiojncrurugbb*&^5$4$###bregbj哈哈哈哈',
	md5: function(str){
		var obj=crypto.createHash('md5');

		obj.update(str);

		return obj.digest('hex');
	}
}



引用
const common=require('./libs/common');

var str=common.md5('123456');
console.log(str)

可以多次签名以防万一
var str=common.md5(common.md5(common.md5('123456')));

------------------
他们的解密一般都是靠穷举,下面的技巧可以极大的解决问题
对于暴力破解长度是关键.

str1="123456";
var str1=common.md5(str1+common.MD5_SUFFIX);
console.log(str1)

这个方法更好，别人也不好猜你后面的东西