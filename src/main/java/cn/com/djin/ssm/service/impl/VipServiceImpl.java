package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.Vip;
import cn.com.djin.ssm.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author：djin
 * @date：2019/05/17 16:42:58
 *    会员业务层实现类
 **/
@Service
@Transactional(readOnly = false)//开启事务
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService {
}
