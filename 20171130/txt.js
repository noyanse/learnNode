10 个JavaScript概念
1、 原始值和引用值(Value vs. Reference) —— 了解如何将对象，数组和函数复制并传递给函数。要知道引用时复制了什么。理解原始值是通过复制值来进行复制和传递的。

2、 作用域(Scope) —— 了解全局作用域，函数作用域和块作级用域之间的区别。了解哪些变量在哪些地方可用。知道 JavaScript 引擎如何执行变量查找。

这里有相关译文：深入理解JavaScript中的作用域和上下文

3、 提升(Hoisting) —— 理解变量和函数声明会被提升到可用作用域的顶部。 理解函数表达式不会被提升。

也可以看看这篇文章：JavaScript 中的 Hoisting (变量提升和函数声明提升)

4、 闭包(Closures) —— 知道一个函数保留，并且可以访问创建它的作用域。知道这些可以让我们做什么，例如数据隐藏、内存化以及动态函数生成。

了解一下作用域和闭包 之间的联系

5、 this —— 知道 this 绑定的规则。知道它的工作机制，知道如何弄清楚在一个函数中它等同于什么，或者说指向什么？并知道为什么它是有用的。

6、 new —— 知道它如何与面向对象编程相关。知道用 new 调用的函数会发生什么。理解如何使用 new 来继承函数 prototype(原型) 属性生成的对象。

7、 apply, call, bind —— 知道这些函数的工作机制。 知道如何使用它们。了解它们对 this 做了什么。

8、 原型和继承(Prototypes & Inheritance) —— 了解 JavaScript 中的继承是通过 [[Prototype]] 链实现的。了解如何通过函数和对象来设置继承，以及 new 是如何帮助我们实现的。知道 __proto__ 和 prototype 属性是什么，以及他们的作用。

9、 异步 JS(Asynchronous JS) —— 理解事件循环，理解浏览器是如何处理用户输入、Web 请求和一般事件的。知道如何识别并正确实现异步代码。理解 JavaScript 中异步和单线程分别是怎样的。

10、 高阶函数(Higher Order Functions) —— 理解这些函数是 JavaScript 中的一等公民，以及这意味着什么。 知道从另一个函数返回一个函数是完全合法的。 了解闭包和更高阶函数允许我们使用的技巧。



alternatively   adv.二者择一地； 要不然； 或者；

strand   vi.搁浅； 陷入困境；


部署vps ssr


yum -y install wget

wget -N --no-check-certificate https://softs.fun/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh


修改：bash ssr.sh

复制上面的代码到VPS服务器里，安装脚本后，以后只需要运行这个快捷命令就可以出现下图的界面进行设置，快捷管理命令为：bash ssr.sh



一键加速vps服务器

yum -y install wget

wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh

chmod +x bbr.sh

./bbr.sh