const path=require('path')

var str = 'c:\\wamp64\\www\\a.html';

var obj = path.parse(str)//path解析文件路径

// console.log(obj)
// 解析完后的属性
//base：文件名部分
//ext：扩展名部分
//dir:文件路径
//name：文件名，不包含扩展名


// console.log(obj.ext)//获取扩展名



