package cn.com.djin.ssm.controller.main;

import cn.com.djin.ssm.controller.BaseController;
import cn.com.djin.ssm.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 *   订单控制器层
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders> {

    //去到订单支付页面
    @RequestMapping("/toOrdersPay")
    public String toOrdersPay(Orders orders, HttpServletRequest request){
        System.out.println("pay");
        request.setAttribute("orderNum",orders.getOrderNum());
        request.setAttribute("orderMoney",orders.getOrderMoney());
        return "alipay/ordersPay";
    }

    //支付完成后的操作
    @RequestMapping("/myOrdersPay")
    public String myOrdersPay(String out_trade_no,Orders orders){
        orders.setOrderNum(out_trade_no);
        orders.setOrderStatus("1");
        try {
            baseService.updateByCoulmnSelective(orders);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }
}
