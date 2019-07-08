package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.Authority;
import cn.com.djin.ssm.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @author：djin
 * @date：2019/05/14 14:04:49
 *   权限控制器
 **/
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority> {

    //去到平台首页并加载菜单
    @RequestMapping("/toIndex")
    public String toIndex(Model model, HttpSession session){
        User loginUser = (User)session.getAttribute("loginUser");
        try {
            model.addAttribute("listMap",authorityService.findManyAuthorityByRoleId(loginUser.getRoleId()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

    //加载树形权限
    @RequestMapping("/loadTreeAuthorityByRoleId")
    @ResponseBody
    public List<Authority> loadTreeAuthorityByRoleId(Integer roleId){
        try {
            return authorityService.findTreeAuthorityByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //加载二级权限根据角色id
    @RequestMapping("/loadSecondAuthorityByRoleId")
    @ResponseBody
    public List<Authority> loadSecondAuthorityByRoleId(Integer roleId){
        try {
            return authorityService.findSecondAuthorityByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
