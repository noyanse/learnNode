缓存
<keep-alive>
	<router-view />
</keep-alive>

页面公用组件都放在components目录下
其它的页面都放在pages下

首页：
幻灯片抽成组件
可以给style加个scoped限制使用范围
<style scoped></style>


循环:
<template></template>相当于div
<template v-for="product in productList">
<h3>{{ product.title }}</h3>
<ul>
<li v-for="item in product.list">
	<a :href="item.url">{{ item.name }}</a>
</li>
</ul>
<div v-if="item.hot">HOT</div>
<div v-if="!product.last" class="hr"></div>
</template>

border:
<div class="indec-board-list">
	<div class="index-board-item" 
	//index是索引
	v-for="(item,index) in boardList"
	//给偶数添加line-last class
	:class="[{ 'line-last' : index % 2 !== 0 },'index-board-' + item.id]">
		<h2>{{ item.title}}</h2>
		<p>{{ item.description }}</p>
	</div>
</div>

--------------------------------

- 从后端获取数据
	通过ajax
	vue-resource

1.安装
	npm install vue-resource
2.在入口文件中引用
	import VueResource from 'vue-resource'
3.Vue.use(VueResource)
	之后在所有的组件都可以用
	this.$http
export default {
	created: function(){//组件创建完毕后
		this.$http.get('/getList')
		.then((res)=>{//使用ES6可以解决this指向问题
			this.newsList = res.data
		},(err)=>{
			console.log(err)
		})
	},
}
post请求可以带参数
	created: function(){//组件创建完毕后
		this.$http.post('getList', {userId: 123})
		.then(function(data){
			console.log(data)
		},function(err){
			console.log(err)
		})
	}

------------------------------------------


开发阶段跟后端要接口麻烦，可以先用数据模拟mock data
如；json-server

npm install json-server --save


测试都在build下dev-server:

1.引入
var jsonServer = require('json-server')

2.实例化jsonServer
var jsonServer = new jsonServer()

标准的json格式,接口getNewsList应是后端提供
{
	"getNewsList": [
		{
			title: '数据统计',
			url: 'http://starcraft.com'
		},
		{
			title: '数据预测',
			url: 'http://warcraft.com'
		},
		{
			title: '流量分析',
			url: 'http://overwatch.com'
		},
		{
			title: '广告发布',
			url: 'http://hearstone.com'
		}
	]
}

--------------------------------------

json-server只能通过get获取数据，没办法用post请求

可以通过express来启动测试服务器
把数据写进db.json中，然后读取db.json
var bodyParser = require('body-server')
var apiServer = express()
apiServer.use(bodyParser.urlencoded({extended: true}))
apiServer.use(bodyParser.json())
var apiRouter = express.Router()
apiRouter.get('/:apiName')
 .all(function(req,res){
 	fs.readFile('./db.json','utf-8',(err,data)=>{
 		if(err) throw err
 		var data = JSON.parse(data)
 		if(data[req.params.apiName]){
 			res.json(data[req.params.apiName])
 		}else{
 			res.send('no such api name')
 		}
 	})
 })

 apiServer.use('/api',apiRouter);


 -----------------------------------------

 - 幻灯片组件:
官方vue插件
https://github.com/vuejs/awesome-vue/

手写一个slider组件

- 创建一个slide.vue

- 在index.vue的script中引入
import slide from "@/components/slide"

- 声明
export default {
	components: {
		slide
	}
}
	
- 使用：渲染到模板
<slide></slide>


总结
父组件  -------props(slides)----vuejs组件
vuejs组件------事件(onchange)---父组件

图片通过js引入，要用require webpack会解析

翻页： 循环
可以通过计算属性实现翻页