package cn.com.djin.ssm.test;

import cn.com.djin.ssm.entity.Orders;
import cn.com.djin.ssm.service.AuthorityService;
import cn.com.djin.ssm.service.OrdersService;
import cn.com.djin.ssm.service.impl.AuthorityServiceImpl;
import cn.com.djin.ssm.service.impl.OrdersServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/21 08:55:32
 * 权限业务层测试类
 **/
public class AuthorityServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(AuthorityServiceTest.class);

    //员工业务层对象
    private AuthorityService authorityService;

    //读取spring.xml文件
    @SuppressWarnings("resource")
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring_main.xml");
        authorityService = cxt.getBean("authorityServiceImpl", AuthorityServiceImpl.class);
    }

    //测试加载菜单操作
    @Test
    public void test01(){
        try {
            List<Map<String, Object>> listMap = authorityService.findManyAuthorityByRoleId(1);
            log.info(listMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}