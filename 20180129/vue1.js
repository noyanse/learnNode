import Vue from 'vue'//引入vue库
new Vue({
	el: '#app',
	template: '<p>hello {{ word }} </p>',
	data: {
		word: 'world'
	}
})