package cn.com.djin.ssm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
* @author 作者:zzbin
* QQ： 694608961
* @version 创建时间：2018年9月14日 下午11:44:18
* 类说明：后台首页拦截器
*/
public class MyInterceptor implements HandlerInterceptor{

	//日志对象
	private static final Logger log = LogManager.getLogger(MyInterceptor.class);	
	
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		log.info("执行了afterCompletion方法。。。。。");
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		log.info("执行了postHandle方法。。。。。");
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		log.info("执行了preHandle方法。。。。。");
		
		//处理是否登录的拦截，获取session中的user
		Object user = request.getSession().getAttribute("loginUser");
		//判断user是否存在
		if(user==null){
			request.setAttribute("MyInterLogin", 200);
			//请求转发
			request.getRequestDispatcher("/model/loginUI").forward(request, response);
			return false;  //阻止请求继续向后执行
		}else{
			return true;   //请求通过此拦截器，继续向后执行
		}
	}
	
}
