package cn.com.djin.ssm.service;

import cn.com.djin.ssm.entity.Authority;

import java.util.List;
import java.util.Map;

public interface AuthorityService extends BaseService<Authority> {

    //加载菜单
    List<Map<String,Object>> findManyAuthorityByRoleId(Integer roleId)throws Exception;

    //加载树形权限
    List<Authority> findTreeAuthorityByRoleId(Integer roleId) throws Exception;

    //加载权限，角色修改时使用
    List<Map<String,Object>> findAllAuthoritys() throws Exception;

    //加载二级权限根据角色id
    List<Authority> findSecondAuthorityByRoleId(Integer roleId) throws Exception;
}
