package cn.com.djin.ssm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author：djin
 * @date：2019/05/21 09:59:38
 *   页面跳转的控制器
 **/
@Controller
@RequestMapping("/model")
public class ModelController {

    //去到显示入住信息页面
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inRoomInfo/showInRoomInfo";
    }

    //去到显示入住信息页面
    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    //去到显示入住信息页面
    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inRoomInfo/saveInRoomInfo";
    }

    //去到显示入住信息页面
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    //去到客房信息管理页面
    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    //去到客房信息管理页面
    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }

    //去到会员信息管理页面
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    //去到会员信息管理页面
    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }

    //去到登录页面
    @RequestMapping("/loginUI")
    public String loginUI(){
        return "login/login";
    }

    //去到用户页面
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "role/showUser";
    }

    //去到用户添加页面
    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "role/saveUser";
    }
}
