package cn.com.djin.ssm.entity;

public class Role_Auth {
    /** 主键 */
    private Integer id;

    /** 角色id */
    private Integer roleId;

    /** 权限id */
    private Integer authId;

    /** 权限id字符串 */
    private String authIds;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getAuthId() {
        return authId;
    }

    public void setAuthId(Integer authId) {
        this.authId = authId;
    }

    public String getAuthIds() {
        return authIds;
    }

    public void setAuthIds(String authIds) {
        this.authIds = authIds;
    }
}