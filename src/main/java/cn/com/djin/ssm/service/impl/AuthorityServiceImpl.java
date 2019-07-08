package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.Authority;
import cn.com.djin.ssm.service.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author：djin
 * @date：2019/05/13 16:55:24
 *  权限业务层实现类
 **/
@Service
@Transactional(readOnly = false)//开启事务
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {

    //加载菜单
    @Override
    public List<Map<String, Object>> findManyAuthorityByRoleId(Integer roleId) throws Exception {
        List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
        List<Authority> pAuthoritys = authorityMapper.selectAuthorityByRoleId(roleId,0);
        for (int i = 0;i < pAuthoritys.size();i++){
            Map<String, Object> meauMap = new HashMap<String, Object>();
            meauMap.put("aPName",pAuthoritys.get(i).getAuthorityName());
            meauMap.put("aPId",pAuthoritys.get(i).getId());
            List<Authority> cAuthoritys = authorityMapper.selectAuthorityByRoleId(roleId,pAuthoritys.get(i).getId());
            meauMap.put("cAuthoritys",cAuthoritys);
            listMap.add(meauMap);
        }
        return listMap;
    }

    //加载树形权限
    @Override
    public List<Authority> findTreeAuthorityByRoleId(Integer roleId) throws Exception {
        return authorityMapper.selectTreeAuthorityByRoleId(roleId);
    }

    //加载权限，角色修改时使用
    @Override
    public List<Map<String, Object>> findAllAuthoritys() throws Exception {
        List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
        Authority pramasAuthority = new Authority();
        pramasAuthority.setParent(0);
        List<Authority> pAuthoritys = baseMapper.selectManyTByPramas(pramasAuthority);
        for (int i = 0;i < pAuthoritys.size();i++){
            Map<String, Object> meauMap = new HashMap<String, Object>();
            meauMap.put("aPName",pAuthoritys.get(i).getAuthorityName());
            meauMap.put("aPId",pAuthoritys.get(i).getId());
            pramasAuthority.setParent(pAuthoritys.get(i).getId());
            List<Authority> cAuthoritys = baseMapper.selectManyTByPramas(pramasAuthority);
            meauMap.put("cAuthoritys",cAuthoritys);
            listMap.add(meauMap);
        }
        return listMap;
    }

    //加载二级权限根据角色id
    @Override
    public List<Authority> findSecondAuthorityByRoleId(Integer roleId) throws Exception {
        List<Authority> sAuthoritys = new ArrayList<Authority>();
        List<Authority> pAuthoritys = authorityMapper.selectAuthorityByRoleId(roleId,0);
        for (int i = 0;i < pAuthoritys.size();i++){
            List<Authority> cAuthoritys = authorityMapper.selectAuthorityByRoleId(roleId,pAuthoritys.get(i).getId());
            for (int j = 0;j < cAuthoritys.size();j++){
                sAuthoritys.add(cAuthoritys.get(j));
            }
        }
        return sAuthoritys;
    }
}
