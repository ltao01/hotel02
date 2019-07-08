package cn.com.djin.ssm.mapper;

import cn.com.djin.ssm.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AuthorityMapper extends BaseMapper<Authority>{

    //加载菜单
    List<Authority> selectAuthorityByRoleId(@Param("roleId")Integer roleId, @Param("parent")Integer parent) throws Exception;

    //加载树形权限
    List<Authority> selectTreeAuthorityByRoleId(Integer roleId) throws Exception;
}