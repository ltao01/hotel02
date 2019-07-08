package cn.com.djin.ssm.test;

import cn.com.djin.ssm.entity.Orders;
import cn.com.djin.ssm.service.OrdersService;
import cn.com.djin.ssm.service.impl.OrdersServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author：djin
 * @date：2019/05/21 08:55:32
 * 入住信息业务层测试类
 **/
public class OrdersServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(OrdersServiceTest.class);

    //员工业务层对象
    private OrdersService ordersService;

    //读取spring.xml文件
    @SuppressWarnings("resource")
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring_main.xml");
        ordersService = cxt.getBean("ordersServiceImpl", OrdersServiceImpl.class);
    }

    //测试支付后的操作
    @Test
    public void test01(){
        Orders orders = new Orders();
        orders.setOrderNum("20190602110756426289");
        orders.setOrderStatus("1");
        try {
            String updIf = ordersService.updateByCoulmnSelective(orders);
            log.info(updIf);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}