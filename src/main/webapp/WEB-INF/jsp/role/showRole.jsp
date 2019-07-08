<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>角色信息显示页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
  <jsp:include page="updRole.jsp"/>
  <fieldset class="layui-elem-field layui-field-title">
      <legend>角色信息管理</legend>
  </fieldset>
  <div align="center">
      <!--权限树形容器-->
      <div id="ztreeDiv" class="content_wrap" style="display: none;">
          <div class="zTreeDemoBackground left">
              <ul id="test1" class="ztree"></ul>
          </div>
      </div>
      <!--表格渲染数据存放的容器-->
      <table  id="demo" lay-filter="test3"></table>
  </div>
</body>
    <script src="js/showRole.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe615;</i>查看</a>
        {{#  if(d.flag == 1){ }}
            <a class="layui-btn layui-btn-xs layui-btn-normal layui-btn-disabled" lay-event="edit1"><i class="layui-icon">&#xe642;</i>修改</a>
        {{#  } else { }}
            <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
        {{#  } }}
    </script>
    <!--显示是否可用自定义模板-->
    <script type="text/html" id="templetStatus">
        {{#  if(d.status == 0){ }}
        <font color="red">禁用</font>
        {{#  } else { }}
        <font color="green">可用</font>
        {{#  } }}
    </script>
    <!--显示是否可用自定义模板-->
        <script type="text/html" id="templetFlag">
        {{#  if(d.flag == 1){ }}
        <font color="#663399">超级角色</font>
        {{#  } else { }}
        <font color="#a52a2a">普通角色</font>
        {{#  } }}
    </script>
</html>