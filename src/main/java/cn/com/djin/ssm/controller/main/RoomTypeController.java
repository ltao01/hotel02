package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.RoomType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author：djin
 * @date：2019/05/13 16:55:24
 *   房间类型业务层控制器
 **/
@Controller
@RequestMapping("/roomType")
public class RoomTypeController extends BaseController<RoomType> {
}
