<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/6/2 0002
  Time: 23:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!--权限信息修改div-->
<div style="display:none; margin-top: 20px;" id="updRoleDiv">
    <form class="layui-form" action="" lay-filter="checkForm">
        <c:forEach items="${listMap}" var="map">
            <div class="layui-form-item">
                <label class="layui-form-label" style="width: 110px;">${map['aPName']}：</label>
                <div class="layui-input-block">
                    <c:forEach items="${map['cAuthoritys']}" var="authority">
                        <input type="checkbox" lay-filter="authority" aPId="${map['aPId']}" value="${authority.id}" title="${authority.authorityName}">
                    </c:forEach>
                </div>
            </div>
        </c:forEach>
    </form>
</div>
</body>
</html>
