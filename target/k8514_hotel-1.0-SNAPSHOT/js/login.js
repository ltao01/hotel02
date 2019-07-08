layui.use(['layer'],function(){
	var $ = layui.$,
	layer = layui.layer;
	
	var userNameIf = false;
	var pwdIf = false;
	var yzmIf = false;
	
	if($("#MyInterLogin").val()==200){
		layer.msg("您还未登陆，请先登陆！！！",{"icon":2,"time":2000});
	}
	
	//验证用户名
	$("#userName").blur(function(){
		if($("#userName").val()==""){
			layer.tips("用户名不能为空",$(this),{tips:[2,'#FF5722']});
			return false;
		}if($("#userName").val().length <3 || $("#userName").val().length > 9){
			layer.tips("用户名长度为3到9位",$(this),{tips:[2,'#FF5722']});
			return false;
		}else{
			layer.tips("用户名格式输入正确",$(this),{tips:[2,'green']});
			userNameIf = true;
		}
	});
	//验证密码
	$("#pwd").blur(function(){
		if($("#pwd").val()==""){
			layer.tips("密码不能为空",$(this),{tips:[2,'#FF5722']});
			return false;
		}if($("#pwd").val().length <6 || $("#pwd").val().length > 12){
			layer.tips("密码长度为6到12位",$(this),{tips:[2,'#FF5722']});
			return false;
		}else{
			layer.tips("密码格式输入正确",$(this),{tips:[2,'green']});
			pwdIf = true;
		}
	});
	//验证动态验证码
	$("#yzm").blur(function(){
		$.ajax({
			type:"post",
			url:"user/yzVerifyCode",
			data:{"userVerifyCode":$("#yzm").val()},
			success:function(data){
				if(data=="success"){
					layer.tips("验证码输入正确",$("#yzm"),{tips:[2,'green']});
					yzmIf = true;
				}else{
					layer.tips("验证码不正确，请重新输入",$("#yzm"),{tips:[2,'#FF5722']});
                    yzmIf = false;
				}
			},
			error:function(){
				layer.msg("对不起，服务器异常！！！",{"icon":3,"time":2000});
			}
		});
	});
	
	//登录提交
	$("#butLogin").click(function(){
	    if(userNameIf&&pwdIf&&yzmIf){
	    	var jsonUser = {};
	    	//获取表单中的所有input标签中的数据，将其转为对象数组
	    	var user = $("form").serializeArray();
	    	//通过循环将对象数组转为JSON数据
	    	$.each(user, function() {
	    		jsonUser[this.name] = this.value;  //jsonUser[loginName] = zhangsan
			});
	    	//ajax登录
	    	loginUser(jsonUser);
	    }else{
	    	layer.msg("输入错误，请重新输入",{"icon":2,"time":2000});
	    }	
	});
	
	//Ajax登录
	function loginUser(jsonUser){
		$.ajax({   
			type:"post",//请求方式
			url:"user/login",//访问后台方法的路径
			data:jsonUser,//传入后台的json对象数据
			success:function(data){//服务器执行正常   data为ajax执行的回调数据对象  data为后台map集合转编译的json数据对象
				if(data=="success"){
					layer.msg("恭喜你，登录成功。。。",{"icon":6,"time":2000,anim: 3});
					//登录成功后的页面跳转
					setTimeout('window.location = "authority/toIndex"',2000);
				}else{
					layer.msg("很遗憾，登录失败！！！",{"icon":2,"time":2000,anim: 6});
				}
			},
			error:function(){//服务器执行异常
				layer.msg("对不起，服务器异常！！！",{"icon":3,"time":2000,anim: 3});
			}
		});
	}
	
	
	
	
	
	
});