vue2.0：
### vue路由
- 前端路由：根据不同的url地址展示不同的内容或页面

以前是用模板引擎的局部渲染

前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，
之前是通过 服务器根据不同的url返回不同的页面形式的。

- 什么时候使用前端路由？
在大页面应用，大部分页面结构不变，只改变部分内容的使用

- 前端路由的优缺点：
优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户

缺点：
	1.不利于SEO
	2.使用浏览器的前进，后退键的时候会重新发送请求，没有合理的利用缓存。
	3.单页面无法记住之前滚动的位置，无法在前进后退的时候救助滚动位置


- vue-router用来构建SPA
路由跳转标签，背后就是a标签
1. <router-link></router-link>或者
编程式跌路由
this.$router.push({path:""})
渲染
2. <router-view></router-view>

------------------------------------------------


- 动态路由匹配
商城详情页，商品ID
- 前套路有

编程式跌路由
命名路由和命名视图

------------------------------------------------

vue2.0 慕课网fishenal
###vue功能：
	1.模块渲染
	2.模块化
	3.扩展功能
		- 路由
		- Ajax
vue基础知识
1.vue实例
2.vue组件
3.vue指令
4.内置组件
5.实例方法
6.实例选项
7.实例属性
8.模板渲染
9.条件渲染
10.组件交互
11.标签属性
12.事件绑定
13.计算属性
14.属性监听
15.表单
16.动画
17.vue--cli项目搭建
18.vue-router路由
19.vuex

前置知识
- Node npm
- js es6

----------------------------------

2016.10 发布2.0版本，更强大

功能：
数据渲染/数据同步
组件化/模块化
其他功能：路由，ajax，数据流

<my-component></my-component>组件

vue学习资源
- 官网
- github/vuejs/
- forum.vuejs.org论坛

vue实例对象
new Vue()----构造函数
el,data---------构造参数
参数选项
new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue.js'
	}
})

new Vue({
	el: '#app',//挂载点
	template: '<div>{{ fruit }}</div>',//html片段或组件
	data: {//数据会被代理到vue实例对象中
		fruit: 'apple'
	}
})

//根组件挂载到body中
new Vue({
	el: 'body',
	components: { App }//App组件引入
})

### 组件生命周期
npm install vue
import vue from 'vue'//引入vue库
类似于require
new Vue({
	el: '#app',
	data: {
		word: 'Hello World'
	}
})

注册组件
Vue.component('my-header',{//配置等同于new Vue({})中的配置
	template: '<p>this is my header</p>'
})
<my-header></my-header>

###模板套模板
var myHeaderChild = {
	template: '<p>this is my headerChild</p>
}
var myHeader = {
	template: '<p>this is my header</p>',
	components: {
		'my-header-child': myHeaderChild
	}
}
根节点
new Vue({
	el: '#app',
	data: {
		word: 'Hello World'
	},
	components: {
		'my-header': myHeader
	}
})

注意： data注意引用赋值，避免直接给data设值
否则会改变所有组件
解决办法：
var root = data: function(){
	return {
		f: 1,
		d: 2
	}
}
root.$data获取数据
设置方法:
root.$on('emit',function(){

})
v-html=""可以把数据渲染到html内部
v-on:click=""将事件绑定到元素上
v-on:keydown.enter=""

### vue基本概念
- 内置组件
<component :is=""></component>
<keep-alive><router-view></router-view></keep-alive>
<keep-alive>:缓存

v-text 会把标签转换成字符串
v-html 会输出标签中的内容

列表渲染
v-for

data(){
	return {
		list: [
		{
			name: 'apple',
			price: 34
		},
		{
			name: 'banana',
			price:56
		}
		],
		objList: {
			name: 'apple',
			price: 34,
			color: 'red',
			weight: 14
		}
	}
}
数组循环列表
<ul>
<li v-for="(item, index) in list" :class="{odd:index % 2}">{{ item.name }} : {{ item.price }}- {{ index }}</li>
</ul>

index:序号
偶数项加上odd

对象循环列表

<li v-for="value in objList" > {{ vaule }} </li>

要展现key的话：

<li v-for="(value, key) in objList" > {{ key + vaule }} </li>

import componentA from './components/a'

添加item
<ul>
<li v-for="(item, index) in list" :class="{odd:index % 2}">{{ item.name }} : {{ item.price }}- {{ index }}</li>
</ul>
<button v-on:click="addItem">addItem</button>
methods: {
	//es6
	addItem () {
		//console.log(this.list)
		this.list.push({
			name:'pinapple',
			price: 333
		})
		//改参数
		Vue.set(this.list, 1, {
			name:'pinapple',
			price: 333
		})
	}
	//es5
	// addItem: function(){

	// }
}

------------------------------------

vue标签属性和全局渲染
v-bind: 绑定标签属性,属于动态绑定
v-bind:href="link"
:href="link" 缩写
data(){
	return {
		link: 'http://www.baidu.com'
	}
}

不是通过v-bind绑定的 link就是个字符串
用v-bind link就是一个变量

v-bind常用来绑定class
v-bind:class="className"
如果classStr是个对象的话：
className: {
	'red-font': true,//显示
	'blue-font': false//隐藏
},
hasError:true
v-bind绑定的class 和原来的class是不冲突的

数组和对象也可以混用
<a :class="[classA, {'red-font' : hasError}]"></a>

:style="linkcss" 绑定内联样式

linkcss: {
	'font-size': '20px'
}

条件渲染
v-if="isPartA"
v-show="!isParta"

<button v-on:click="toggle">toggle</button>

isPartA: true

methods: {
	toggle(){
		this.isPartA = ! this.isPartA
	}
}

v-bind缩写:title=""
v-on 缩写 @click=""
v-on:click.stop阻止默认事件
@keydown.enter="onKeyDown" 按enter时执行
@keydown.13="" 13是修改器

自定义事件用emit触发
@click="emitMyEvent"

methods: {
	emitMyEvent(){
		this.$emit('my-event',this.hello)
	}
}

-------------------------------

- 表单事件绑定v-model
<input v-model="myValue" type="text">

<select v-model="selection">
	<option v-for="item in selectOptions" :value="item.value">{{ item .text }}</option>
</select>

selectOptions: [
{
	text: 'apple',
	value: 0
},
{
	text: 'banana',
	value: 1
}
]

v-model三种修改器
v-model.lazy 延迟
v-model.number 强制值是数字
v-model.trim 裁剪空格

----------------------------------

###计算属性和数据监听
{{ myValue }}
computed: {
	myValueWithoutNum(){
		return this.myValue + replace(/\d/g, '')
		//删掉数字
	}
}
计算属性根据其他属性的变化同步更新


属性监听
watch: {
	myVal: function(val,oldVal){
		console.log(val, oldVal)
	}
}


-----------------------------------

### vue组件

<p :is="com-a"></p>
引入com-a组件，这样写可以组件可以动态
<com-a></com-a>

父组件向子组件传递信息通过Props

<com-a number=5></com-a>

子组件：
export default {
	props: ['number'] //声明,
	methods: {
		this.number 取得这个值
	}
}

* 属;性大小写不敏感，通过中线区分单词
props: {

}

slot父组件向子组件传递信息

动态组件
:is="currentView"
应用场景：tab切换
<keep-alive>支持内置标签

过渡效果
transition组件
<transition name="fade" mode="out-in">
	<p v-show="show">i am show</p>
</transition>
主要通过css类名实现的
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

-------------------------------------------------

