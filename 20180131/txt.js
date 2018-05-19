- 前端路由
1.安装前端路由
	cnpm install vue-router --save 保存到配置文件里
	安装完成会写进配置文件里
2.在入口文件中引入vue-router	
	import VRoter from 'vue-router'

//使用路由
 Vue.use(VRouter)

//实例化,映射关系
 let router = new VRouter({
 	//hash用来处理v-html5的方式，支持前后的切换
 	//把mode设为history访问根目录没有#,访问子页面也不用用过#解析
 	mode: 'history',
 	routes: [
 		{
 			path: '/apple',//路径
 			component:  Apple//组件
 		},
 		{
 			path: '/banana',
 			component: banana
 		}
 	]
 })

 new Vue({
 	el: '#app',
 	router,
 	template: '<App/>',
 	components: { App }
 })

在App.vue中加入<router-view/> 路由
 //本来就有vue-router

 ------------------------------------

 可以把路由单独放到一个文件里
 - +router
 	 index.js:
1. 导入相关模块
2. 使用路由 Vue.use(Router)
3. 导出实例化路由 
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Apple from '@/components/Apple'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/apple',
    	name: 'Apple',
    	component: Apple
    }
  ]
})


- main.js:

import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

- app.vue:

<template>
<h1>{{ msg }}</h1>
</template>
<script>
export default {
	name: 'Apple',
	data(){
		return {
	      msg: 'my name is Apple'
	    }
	}
}
</script>

- app.vue:
<template>
	<router-view/>
	<router-link :to="{path:'apple'}">to apple</router-link>
	<router-link :to="{path:'banana'}">to banana</router-link>
</template>

-------------------------------------------

路由参数
	页面传进去参数
/:color

设定参数：
在路由+router
		index.js
		new Router({
			routes:[
				{
					path: '/apple/:color',
					component: Apple
				}
			]
		})

获取参数：

apple.vue:

<h4>{{ $route.params.color }}</h4>获取参数
<button @click="getParam">get param</button>
	export default {
		data(){
			return {
				msg: 'i am apple'
			}
		},
		methods: {
			getParam(){
				console.log(this.$route.params)
			}
		}
	}

*添加参数以后必须完整的匹配路由

更多的参数:
path: '/apple/:color/detail/:type',


## vue-router(路由嵌套)---子路由

子组件只插入到父组件
要在父组件插入router-view
new Router({
	routes: [
		{
			path: '/apple',
			component: Apple,
			children: [
				{
					path: 'red',
					component: RedApple
				}
			]
		}
	]
})

也可以使用router-link跳转
<router-link :to="{path:'apple/redApple'}">
	to apple/redApple
</router-link>

router-link如果是个简单的跳转直接
to="/apple" 跳转到根目录的apple地址

:to="{path:'banana',param:{color:'yellow'}}"//绑定的话传入对象
把参数自定义传进去

具名的路由
转化为ul li
<router-link :to="{name: 'applePage'}" tag="li">
xxx
</router-link>

声明式导航

-----------------------------------

编程式导航
js中
router.push({path:'apple'})
router.beforEach(router.push({...}))
每次路由切换时候
可以进行一些操作，如检查用户信息


命名视图
<router-view name="viewA">
<router-view name="viewB">

new Router({
	routes: [
		{
			path: '/apple',
			component: {
				viewA: Apple,
				viewB: redApple
			}
		}
	]
})


------------------------------

前端路由重定向

当访问首页的时候重定向到apple
routes: [
	{
		path: '/',
		redirect: '/apple'
	}


-------------------------------

transtion
keep-alive做一个缓存

<transtion name="fade">
	<keep-alive>
		
	</keep-alive>
</transtion>

总结：
	路由map
	路由视图
	路由导航


----------------------------------


###vuex状态管理插件
应用场景：每个组件会共享状态，如用户登录，
购物车等，比如头部改变购物车增删，其他的也
跟着更新。

当列表更新的时候，通过事件传到另一个组件
缺点:
	组件很多时候，要通知所有组件，很麻烦

vue数据中心store

vuex状态管理实例：
1.安装：
	cnpm install vuex --save

2.在入口文件中引入
	import Vuex from 'vuex'
3.注册
	Vue.use(Vuex)
4.实例化
	let store = new Vuex.store({
		state: {
			totalPrice: 0
		},
		//获取状态集中的数据
		/*getters: {
			getTotal(state){
				return state.totalPrice
			}
		},*/
		mutations: {
			increment(state,price){
				state.totalPrice += price
			},
			decrement(state,price){
				state.totalPrice -+ price
			}
		},
		/*actions: {
			//传进来的参数就是store

			increase(context,id){
				api(id,function(price){
					context.commit('increment',price
				})
				
			}
		}*/
		//有了actions之后就可以在组件里不用
		//commit参数,用dispatch

		zhi
	})

在全局使用store
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

然后可以在每一个子组件里通过触发方法
app.vue:
引用两个组件
{{ totalPrice }}
<apple></apple>
<banana></banana>
export default {
	components: {Apple,banana},
	computed: {//计算属性
		totalPrice(){
			//return this.$shore.getters.getTotal
			return this.$shore.state.totalPrice
		}
	}
}

apple.vue:
<button @click="addOne">add one</button>
<button @click="minusOne">minus one</button>

export default {
	data(){
		return {
			msg: 'i am an apple',
			price: 5
		}
	},
	methods: {
		//使用commit调用increment方法
		addOne(){
			//this.$shore.dispatch('increment',this.price)
			this.$shore.commit('increment',this.price)
		},
		minusOne(){
			this.$shore.commit('decrement',this.price)
		}

	}
}


