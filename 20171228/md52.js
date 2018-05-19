const common=require('./libs/common');

// var str=common.md5(common.md5(common.md5('123456')));

str1="wkyhh562";
var str1=common.md5(str1+common.MD5_SUFFIX);

console.log(str1)