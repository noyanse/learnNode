线上部署
把server代码部署到服务器：
新建package.json
删掉vue插件，babel也删掉（服务端已经支持ES6了），webpack也删掉

传代码到服务器方法:

ssh ftp下载
scp 一定要在客户端执行

ftp方式：
mkdir demo
把项目server文件传到demo中
ls la 查看权限
sudo chmod 777 demo 添加读写执行权限

scp方式:
server 端口改成3000
 scp /ImoocMall/server/bin/www root@ip:/workspace/demo/bin/
 输入密码

 vi编辑命令

 vi demo/bin/www
 :q退出

cd demo/
 安装依赖
 cnpm install----可以简写成cnpm i

 rm -rf 文件 -----删除

 node bin/www
 lsof -i:4000 看哪个程序在使用4000这个端口
 kill -9 PID 杀掉这个占用的进程

 node bin/www启动
 弊端：影响我们做别的事情

 pm2 强大的线上部署工具
 npm i pm2
 pm2 start bin/www

 pm2 stop bin/www

 pm2 start all
 pm2 stop all 

 pm2 ls
 pm2 log

 ls -la

 mv www changename 改名字



 就已经部署好了

 ctrl+c停到服务
 ctrl+z在后台进行

 在客服端输入:输入服务器地址和端口


------------------------------------------

前端
cnpm runbuild 生产包

配置


--------------------------------------


Vue 

模板和渲染函数的弹性选择

简单的语法及项目创建

更快渲染速度和更小的体积

React
适用于大型应用和更好的可测试性

ReactNative适用原生App,React适用Web端

更大的生态圈带来更多支持和工具

Vue React相同点
·利用虚拟DOM实现快速渲染
	在JS内存里面定义虚拟的DOM,定义一个Object
	对象去模拟DOM，拼装数据，把整体做个渲染
	一次性插入到DOM中
·轻量级
·响应式组件
·服务器渲染
·易于集成路由工具，打包工具以及状态管理工具
·优秀的支持和社区

npm依赖于node

linux下安装
要下载解压包
npm -install -g npm更新npm 
-g是全局安装
npm list

vue-cli构建SPA应用

-----------------------------------

安装vue
cnpm i vue --save

多页面直接script引用

----------------------------

npm install i -g  webpack
