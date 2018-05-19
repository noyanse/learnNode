幻灯片总结：
1.组件调用子组件
index.vue:
import slide from "@/components/slide"
export default {
	components: {
		slide
	},
}

<slide :slides="slides" :inv="invTime"></slide>

2.用常用的goto()函数
3.上一页下一页用了计算属性
4.setInterval
5.transtion

