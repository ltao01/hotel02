package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.User;
import cn.com.djin.ssm.util.MD5;
import cn.com.djin.ssm.util.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @author：djin
 * @date：2019/05/14 14:04:49
 *   用户信息控制器
 **/
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User> {

    //登录
    @RequestMapping("/login")
    @ResponseBody
    public String login(User user,HttpSession session){
        User loginUser = null;
        try {
            user.setPwd(MD5.md5crypt(user.getPwd()));
            loginUser = this.loadTByPramas(user);
            if(loginUser!=null){
                session.setAttribute("loginUser", loginUser);
                return "success";
            }else{
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

    }

    //获取动态验证码
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpSession session, HttpServletResponse response){
        //通过工具获取动态验证码
        String verifyCode = VerifyCodeUtils.generateVerifyCode(5);
        //将动态验证码装入到HttpSession容器中
        session.setAttribute("verifyCode", verifyCode.toLowerCase());
        try {
            //将动态验证码通过响应输出流对象写入到后台登录页面中
            VerifyCodeUtils.outputImage(250, 35, response.getOutputStream(), verifyCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //验证动态验证码
    @RequestMapping("/yzVerifyCode")
    @ResponseBody
    public String yzVerifyCode(String userVerifyCode,HttpSession session){
        if(userVerifyCode.toLowerCase().equals(session.getAttribute("verifyCode"))){
            return "success";
        }else{
            return "fail";
        }
    }

    //用户退出
    @RequestMapping("/exit")
    @ResponseBody
    public String exit(HttpSession session){
        session.removeAttribute("loginUser");
        return "success";
    }

}
