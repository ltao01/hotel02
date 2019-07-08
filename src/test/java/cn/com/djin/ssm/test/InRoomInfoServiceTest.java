package cn.com.djin.ssm.test;

import cn.com.djin.ssm.entity.InRoomInfo;
import cn.com.djin.ssm.service.InRoomInfoService;
import cn.com.djin.ssm.service.impl.InRoomInfoServiceImpl;
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
 * 入住信息业务层测试类
 **/
public class InRoomInfoServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(InRoomInfoServiceTest.class);

    //员工业务层对象
    private InRoomInfoService inRoomInfoService;

    //读取spring.xml文件
    @SuppressWarnings("resource")
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring_main.xml");
        inRoomInfoService = cxt.getBean("inRoomInfoServiceImpl", InRoomInfoServiceImpl.class);
    }

    //测试框架搭建是否成功（测试数据库连接以及SqlSessionFactory的配置）
    @Test
    public void test01() {
        log.info("inRoomInfoService=" + inRoomInfoService);
    }

    //测试根据条件查询入住信息和房屋信息以及房屋类型信息
    @Test
    public void test02(){
        InRoomInfo inRoomInfoPramas = new InRoomInfo();
        inRoomInfoPramas.setCustomerName("赵");
        try {
            Map<String, Object> map = inRoomInfoService.findTPByPramas(inRoomInfoPramas,1,5);
            List<InRoomInfo> inRoomInfos = (List<InRoomInfo>)map.get("data");
            log.info("总的数据条数："+map.get("count")+"条");
            for (InRoomInfo inRoomInfo:inRoomInfos) {
                log.info(inRoomInfo);
                log.info(inRoomInfo.getRooms());
                log.info(inRoomInfo.getRooms().getRoomType());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}