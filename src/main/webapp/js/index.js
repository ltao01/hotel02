// 配置
layui.config({
	base: './hpModules/' // 扩展模块目录
}).extend({ // 模块别名
	hpTab: 'hpTab/hpTab',
	hpRightMenu: 'hpRightMenu/hpRightMenu',
	hpFormAll: 'hpFormAll/hpFormAll',
});

//JavaScript代码区域
layui.use(['element', 'carousel','hpTheme', 'hpTab', 'hpLayedit', 'hpRightMenu'], function() {
	
	var element = layui.element;
	var carousel = layui.carousel; //轮播
	var hpTab = layui.hpTab;
	var hpRightMenu = layui.hpRightMenu;
	var hpTheme=layui.hpTheme;
	$ = layui.$;
	
    // 初始化主题
	hpTheme.init();
	 //初始化轮播
	carousel.render({
		elem: '#test1',
		width: '100%', //设置容器宽度
		interval: 1500,
		height: '500px',
		arrow: 'none', //不显示箭头
		anim: 'fade', //切换动画方式
	});

    // 初始化 动态tab
    hpTab.init();
    // 右键tab菜单
    hpRightMenu.init();

	//退出
	$("#exit").click(function(){
		 layer.confirm('您确定要退出吗？', function(index){
			exit();
	        layer.close(index);
	      });
	});
	
	//退出的方法
	function exit(){
		$.ajax({	
			type:"post",
			url:"user/exit",
			success:function(data){
				if(data=="success"){
					layer.msg("您已经安全退出",{"icon": 6,"anim":2,"shade": 0.4,"time":2000});
		    		setTimeout('window.location = "model/loginUI"', 2000);
				}else{
					layer.msg("很遗憾，退出异常",{"icon": 5,"anim":6,"shade": 0.4,"time":2000});
				}	
			}
		});
	}

});