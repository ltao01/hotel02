package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.User;
import cn.com.djin.ssm.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author：djin
 * @date：2019/05/13 16:55:24
 *   用户信息业务层实现类
 **/
@Service
@Transactional(readOnly = false)//开启事务
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {
}
