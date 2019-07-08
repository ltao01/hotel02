package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.Role_Auth;
import cn.com.djin.ssm.service.Role_AuthService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   角色权限关系业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class Role_AuthServiceImpl extends BaseServiceImpl<Role_Auth> implements Role_AuthService {

    //重写角色权限添加的方法
    @Override
    public String save(Role_Auth role_auth) throws Exception {
        String[] roleIds = role_auth.getAuthIds().split(",");
        Integer count = 0;
        for (int i=0;i<roleIds.length;i++){
            Role_Auth role_auth1 = new Role_Auth();
            role_auth1.setRoleId(role_auth.getRoleId());
            role_auth1.setAuthId(Integer.parseInt(roleIds[i]));
            count = baseMapper.insert(role_auth1);
        }
        if(count>0){
            return "success";
        }else {
            return "fail";
        }
    }

    //重写根据条件删除角色权限的方法

    @Override
    public String removeTByPeamas(Role_Auth role_auth) throws Exception {
        String[] roleIds = role_auth.getAuthIds().split(",");
        Integer count = 0;
        for (int i=0;i<roleIds.length;i++){
            Role_Auth role_auth1 = new Role_Auth();
            role_auth1.setRoleId(role_auth.getRoleId());
            role_auth1.setAuthId(Integer.parseInt(roleIds[i]));
            count = baseMapper.deleteTByPramas(role_auth1);
        }
        if(count>0){
            return "success";
        }else {
            return "fail";
        }
    }
}
