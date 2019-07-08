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
    <title>订单信息显示页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>

<fieldset class="layui-elem-field layui-field-title">
    <legend>订单信息管理</legend>
</fieldset>

  <!--批量删除按钮-->
  <p style="display: inline-block;margin-top: 10px;"><button id="delBatchBtn" class="layui-btn layui-btn-danger layui-btn-radius"><i class="layui-icon">&#xe640;</i>批量删除</button></p>
  <form class="layui-form layui-form-pane" action="" style="display: inline-block;float: right;">
      <div class="layui-form-item" style="display: inline-block;">
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">订单编号</label>
              <div class="layui-input-inline">
                  <input type="text" name="orderNum" id="order_num" autocomplete="off" class="layui-input" placeholder="请输入关键字">
              </div>
          </div>
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">时间范围</label>
              <div class="layui-input-inline" style="width: 340px;">
                  <input type="text" class="layui-input" name="times" id="test10" placeholder="请选择时间范围"/>
              </div>
          </div>
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">选择状态</label>
              <div class="layui-input-block">
                  <select name="orderStatus" lay-filter="selectTest">
                      <option value="">全部</option>
                      <option value="1">已支付</option>
                      <option value="0">未支付</option>
                  </select>
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
    <script src="js/showOrders.js"></script>
    <script type="text/html" id="barDemo">
        {{#  if(d.orderStatus == 1){ }}
             <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
        {{#  } else { }}
             <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="pay"><i class="layui-icon">&#xe65e;</i>支付</a>
        {{#  } }}
    </script>
    <!--显示是否会员自定义模板-->
    <script type="text/html" id="templetIsVip">
        {{#  if(d.inRoomInfo.isVip == 1){ }}
        <font color="green">是</font>
        {{#  } else { }}
        <font color="red">否</font>
        {{#  } }}
    </script>
    <!--显示退房状态自定义模板-->
    <script type="text/html" id="templetOrderStatus">
        {{#  if(d.orderStatus == 1){ }}
        <font color="green">已结算</font>
        {{#  } else { }}
        <font color="red">未结算</font>
        {{#  } }}
    </script>
</html>