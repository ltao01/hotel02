package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.Authority;
import cn.com.djin.ssm.entity.Roles;
import cn.com.djin.ssm.service.RoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/13 16:55:24
 *  角色业务层实现类
 **/
@Service
@Transactional(readOnly = false)//开启事务
public class RoleServiceImpl extends BaseServiceImpl<Roles> implements RoleService {

    //重写根据条件分页查询方法
    @Override
    public Map<String, Object> findTPByPramas(Roles roles, Integer pageNum, Integer pageSize) throws Exception {
        PageHelper.startPage(pageNum,pageSize);
        PageInfo<Roles> pageInfo = new PageInfo<Roles>(baseMapper.selectTPByPramas(roles));
        List<Roles> rolesList = pageInfo.getList();
        List<Roles> rolesData = new ArrayList<Roles>();
        for (int i=0;i<rolesList.size();i++){
            Roles roles1 = rolesList.get(i);
            List<Authority> authorities = authorityMapper.selectAuthorityByRoleId(roles1.getId(),0);
            String authoritiestr = "";
            for (int j=0;j<authorities.size();j++){
                authoritiestr += authorities.get(j).getAuthorityName()+"，";
            }
            Integer length = authoritiestr.length()-1;
            authoritiestr = authoritiestr.substring(0,length);
            roles1.setAuthoritys(authoritiestr);
            rolesData.add(roles1);
        }
        map.put("data",rolesData);
        map.put("count",pageInfo.getTotal());
        return map;
    }
}
