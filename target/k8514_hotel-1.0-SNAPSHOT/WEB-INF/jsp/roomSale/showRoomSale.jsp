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
    <title>消费信息显示页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title">
    <legend>消费记录显示</legend>
</fieldset>
  <!--批量删除按钮-->
  <form class="layui-form layui-form-pane" action="" style="display: inline-block;float: right;">
      <div class="layui-form-item" style="display: inline-block;">
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">客人姓名</label>
              <div class="layui-input-inline">
                  <input type="text" name="orderNum" id="order_num" autocomplete="off" class="layui-input" placeholder="请输入关键字">
              </div>
          </div>
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">入住时间</label>
              <div class="layui-input-inline" style="width: 340px;">
                  <input type="text" class="layui-input" name="times" id="test10" placeholder="请选择入住时间范围"/>
              </div>
          </div>
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">退房时间</label>
              <div class="layui-input-inline" style="width: 340px;">
                  <input type="text" class="layui-input" name="times" id="test11" placeholder="请选择退房时间范围"/>
              </div>
          </div>
      </div>
      <div class="layui-form-item" style="display: inline-block;">
          <button class="layui-btn" lay-submit="" lay-filter="demo2"><i class="layui-icon">&#xe615;</i>查询</button>
      </div>
  </form>
  <div align="center">
      <!--员工的表格渲染数据存放的容器-->
    <table  id="demo" lay-filter="test3"></table>
  </div>
</body>
    <script src="js/showRoomSale.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="pay"><i class="layui-icon">&#xe65e;</i>查看</a>
    </script>
</html>