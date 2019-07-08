package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.Role_Auth;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author：djin
 * @date：2019/05/14 14:04:49
 *   角色与权限关系表控制器
 **/
@Controller
@RequestMapping("/role_Auth")
public class Role_AuthController extends BaseController<Role_Auth> {
}
