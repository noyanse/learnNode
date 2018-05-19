早上起来看到好大的雪啊，美爆了！！！

fs.unlink(path,(err)=>{})是fs里面专门用来删除文件用的

CRUD


---------------------------------------------------

前台：

要留接口
后台对前台留的接口:
接口文档：
/get_banners
=>[{ID,title,description,href}]

/get_custom_evaluation
=>[{ID,title,description,src}]

router/web.js
//banner数据
router.get('/get_banners',(req,res)=>{
	db.query(`SELECT * FROM banner_table`,(err,data)=>{
		if(err){
			res.status(500).send('database err').end();
		}else{
			res.send(data).end();
		}
	})
})
//custom数据
router.get('/get_custom_evaluation',(req,res)=>{
	db.query(`SELECT * FROM custom_evaluation_table`,(err,data)=>{
		if(err){
			console.error(err)
			res.status(500).send('database err').end();
		}else{
			res.send(data).end();
		}
	})
})

这就可以出来数据了


--------------------------------------------------


接下来做前台渲染

angular 和jquery无法共存


index.html中
用angular框架

引进angular.js

+static/js
<script src="angular.js"></script>
<html ng-app>

<body ng-controller='index'></body>
	<div id="slider" ng-hide="item.hide" ng-repeat="item in banners">
		<h3>{{item.title}}</h3>
		<p>{{item.description}}</p>
		<a href="item.href"></a>
	</div>

	<div id="custom">
		<div class="item" ng-repeat="item in customs">
			<img ng-src="upload/{{item.src}}" alt="{{item.title}}">
			<p>{{item.description}}</p>
		</div>
	</div>
</html>

<script>
	
angular.module('app',[])
//取banners数据
.controller('index',function($scope,$http){
	$http.get('/get_banners').then(function(res){
		alert('成功'+res.data);
		$scope.banners=res.data;

		for(var i=0;i<$scope.banners.length;i++){
			$scope.banners[i].hide=true;
		}
		$scope.banners[0].hide=false;

	},function(){
		alert('获取数据失败')
	});
	//取custom数据
	$http.get('/get_custom_evaluation').then(function(res){
		//成功
		$scope.customs=res.data;
	},function(){
		//失败
		alert('获取数据失败')
	})
})

</script>
C:\Users\Administrator\Desktop\nodejs35