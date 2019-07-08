package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author：djin
 * @date：2019/05/14 14:04:49
 *   角色控制器
 **/
@Controller
@RequestMapping("/role")
public class RoleController extends BaseController<Roles> {

    //去到角色页面
    @RequestMapping("/toShowRole")
    public String toShowRole(Model model){
        try {
            model.addAttribute("listMap",authorityService.findAllAuthoritys());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "role/showRole";
    }
}
