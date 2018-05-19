###vue-clie 官方提供脚手架工具

成熟的vue项目架构设计
本地测试服务器
集成打包上线方案


- 要求
Node >=4.0
git

- 步骤：
npm install vue-cli -g 安装vue-cli
vue init webpack my-project 初始化项目
npm install 安装项目以来
npm run dev 在localhost启动测试服务器
npm run build 生成上线目录（部署）

1.安装nodejs
记得配置环境变量
有npm.cmd的目录要在环境变量的配置里

2.github for windows 下载git
mobaXterm工具,可以启动本地terminal

path use windows .. 打上勾

cnpm 用第二种方式安装

alias 别名

npm update -g npm更新
npm install -g npm 把npm升级到最新版本
n latest

3. cnpm install vue-cli -g
	vue --help
	vue -v
	vue list 官方提供的模板
4.vue init webpack demo
ESLint代码检查工具 使用了会严格要求代码格式
不采用
5.安装依赖 ,安装的就是package.json里面的东西
在有package.json的目录下运行cnpm install 回车就好
安装完成多了一个node_modules目录
**npm run dev 测试版 
vue-cli是有热更新的效果

**npm run build 生成部署用的一套文件
多了一个dist目录，会根据代码生成压缩好的文件

我们的大部分开发都是在src目录下 
index.html默认有一个js入口

export default {

}
可以用 import引用

-----------------------------------

let com = {
	name:'hello',
	data(){
		return {
			msg: 'Welcome'
		}
	}
}
export { com }
非default导出 变量要加上花括号
import { com } from './components/Hello' 

data作为一个组件可能被别的引用,所以用函数的
export default {
	data(){
		return {

		}
	}
}

----------------------------------------

vue router

单页面应用

前端路由：通过js来做



今年2018不管如何得挣50k

第五章2-3结束

20180130