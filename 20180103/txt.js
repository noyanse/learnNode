评论部分：
route/admin/custom.js

index.js
router.use('/custom',require('./custom')());

当我点击用户评价的时候，会进入/admin/custom
这是a链接上去的。
然后index.js通过router.use('/custom',...)进入custom页面
再通过custom.js向custom页面渲染页面。

template/admin/custom.ejs

custom.js:

先把数据都取出来

multer给我们提供了一个files

但凡需要上传文件的form都要一个enctype
enctype="multipart/form-data"

补扩展名
const pathLib=require('path');

var obj=pathLib.parse('/root/aaa/1.txt');

console.log(obj);
包括ext就是扩展名