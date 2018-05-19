- 数据绑定 （模型数据传递给视图 单向的）
vue实例化对象是通过data属性与模型绑定数据的
一旦绑定了数据，vue实例化对象上就创建了相信的属性

一旦数据被绑定上，此时对象上的每一个属性都
具有了特性,这样就与vue实例化对象绑定了

vue实例化对象上的属性不论是值类型还是引用类型都
与模型对象的属性**全等**。
var data = {
	msg: 'hello',
	obj:{
		color: 'red'
	}
}
var app = new Vue({
	el: '#app',
	data: data
})
console.log(app)

app.msg = 'world'

视图改变了是否会更新数据？

模型在实例化对象上的帮顶，是使模型
数据传递给视图，但是单向的。

-------------------------------------------

- 属性插值

1.语法{{}}实现将模型中的数据渲染到视图中。
2.插入的数据不仅仅在元素的内容区域，还可以在
元素的属性中。

- 单词插值
1.有时候我们需要一些数据被渲染就不要更改了，
此时需要单词插值{{*}}

- 避免html编译
通常对于插值，插入的数据如果包含html内容
会将标签编译。有时候我们的需求不需要编译
我们可以避免编译html内容编译

- 插值表达式
插值的语法本质上是提供了一个js环境

- 插值过滤器
对插入的数据进行处理
插值表达式，让我们出入数据形式更复杂了，
使用表达式不能复用
语法： | 过滤器名称


-----------------------------------

- vue模板语法:
1.Mustache语法 {{msg}}
2.Html赋值: v-html=""
3.绑定属性: v-bind:id=""
4.表达式: {{ok ? "YES" : "NO"}}
5.文本赋值: v-text=""
6.指令: v-if=""
7.过滤器: {{message | captialize}} 和 v-bind:id=""

- class和style绑定
1.对象语法：v-bind:class="{active:isActive,"text-danger":hasError}"
2.数组语法
3.条件渲染
	v-if 控制显示隐藏，如果隐藏，整个dom都不会渲染
	v-else
	v-else-if
	v-show 控制显示隐藏，如果隐藏，dom会渲染，只是display:none
	v-cloak 同步隐藏html代码
4.vue事件处理器
	v-on:click="greet" 或者 @click="greet"
	v-on:click.stop 阻止冒泡
	v-on:click.stop.prevent 阻止默认事件
	v-on:click.self 给事件本身绑定事件
	v-on:click.once 只执行一次

	v-on:keyup.enter

- vue组件
1.全局组件和局部组件
2.父子组件通讯-数据传讯
3.Slot

