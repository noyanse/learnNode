vue官方提供了关闭弹窗的方法
$emit('on-close')事件

vue提供vue-validate验证插件

创建package.json
npm init 
按需填写 一路回车

下载react模块
npm install react --save-dev

webpack打包工具
把各种资源都当成模块
1.安装：npm install webpack -g全局安装
	npm install webpack --save-dev放到依赖里面

2.新建app/index.js:
	document.body.innerHTML = 'hello webpack'

	webpack app/index.js 入口文件 build/build.js回车
	把index.js打包成build.js
	index.js引入其他js文件
	第一种方式：var str = require('./app.js')
				console.log(str)
	第二种方式：define(['./app.js'],function(str){
					console.log(str)
				})
	* 常用第一种方式
	app.js:
		module.exports = '欢迎光临我的梦'

3.加样式

	处理的时候从右往左处理
	css需要模块两个加载器
	style.css
	- 处理css文件
	npm install css-loader style-loader --save-dev
	- 处理样式
	// npm install style-loader --save-dev

	在入口文件index.js中引入
	require("style!css!./css/style.css")

	如果有两个css 那么在style.css依赖reset.css

	require("style!css!./css/reset.css")
	require("style!css!./css/style.css")

	*不方便

- webpack配置文件
当前目录建立webpack.config.js文件
module.exports = {
	entry: "./app/index.js", //入口文件
	output: {//出口文件
		path: "./build/"
		filename: "build.js"
	},
	module: {
		loaders: [
			{
				test: /.css$/,
				loaders: [
					"style","css"
				],
				exclude:"/node_modules"//排除的文件
			}
		]
	},
	resolve: {
		//自动补全识别后缀
		extensions: ['','.js','.css','jsx']
	}
}

webpack 回车



- webpack-dev-server
	轻量级的服务器
	修改文件源码后，自动刷新就能把修改同步到页面上

	1.安装 npm install webpack-dev-server -g --save-dev
		安装成功后使用 webpack-dev-server
		webpack-dev-server --hot --inline做自动刷新

		如果端口号被占用，webpack-dev-server --port 3000 --hot --inlie
	热加载时不用刷新

	36min....


------------------------------------------------------



- 自动刷新

webpack-dev-server --hot --inline

页面并变化 --- 在 index.js中要写build.js

devServer: {
	hot: true,
	inline: true
}


### 自动生成html文件html-webpack-plugin插件

- 安装：
npm install html-webpack-plugin --save-dev

- 使用：
在webpack.config.js中引入
var htmlWebpackPlugin = require('html-webpack-plugin');

- 在plugins中配置
plugins: [
	new htmlWebpackPlugin({
		titile: 'My first react app',
		chunks: ['index']
	})
]


配置文件改变后要先打包再重启服务

webpack-dev-server 是生成在内存中的