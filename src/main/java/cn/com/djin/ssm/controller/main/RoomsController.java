package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.Rooms;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author：djin
 * @date：2019/05/17 13:36:25
 *   房屋控制器层
 **/
@Controller
@RequestMapping("/rooms")
public class RoomsController extends BaseController<Rooms> {
}
