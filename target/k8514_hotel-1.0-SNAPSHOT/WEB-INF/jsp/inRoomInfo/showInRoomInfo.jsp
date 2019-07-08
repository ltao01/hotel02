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
    <title>入住信息显示页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>

  <!--入住信息修改jsp-->
  <jsp:include page="updInRoomInfo.jsp"/>

  <!--做客房退房的jsp-->
  <jsp:include page="exitRooms.jsp"/>

  <fieldset class="layui-elem-field layui-field-title">
      <legend>入住信息管理</legend>
  </fieldset>

  <!--批量删除按钮-->
  <p style="display: inline-block;margin-top: 10px;"><button id="delBatchBtn" class="layui-btn layui-btn-danger layui-btn-radius"><i class="layui-icon">&#xe640;</i>批量删除</button></p>
  <form class="layui-form layui-form-pane" action="" style="display: inline-block;float: right;">
      <div class="layui-form-item" style="display: inline-block;">
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">选择分类</label>
              <div class="layui-input-block">
                  <select name="pramasType" lay-filter="selectTest">
                      <option value="">全部</option>
                      <option value="rooms.roomNum">房间号</option>
                      <option value="customerName">客人姓名</option>
                      <option value="phone">手机号</option>
                      <option value="idcard">身份证号</option>
                  </select>
              </div>
          </div>
          <div class="layui-inline" style="margin-top: 8px;">
              <label class="layui-form-label">关键字</label>
              <div class="layui-input-inline">
                  <input type="text" name="inputPramas" id="inputPramas" autocomplete="off" class="layui-input" placeholder="请输入关键字" disabled>
              </div>
          </div>
      </div>
      <div class="layui-form-item" style="display: inline-block;">
          <button class="layui-btn" lay-submit="" lay-filter="demo2"><i class="layui-icon">&#xe615;</i>查询</button>
      </div>
  </form>
  <div align="center">
      <!--员工的表格渲染数据存放的容器-->
    <table  id="demo" lay-filter="test"></table>
  </div>
</body>
    <script src="js/showInRoomInfo.js"></script>
    <script type="text/html" id="barDemo">
        {{#  if(d.outRoomStatus == 1){ }}
             <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
             <a class="layui-btn layui-btn-xs layui-btn-normal layui-btn-disabled" lay-event="edit0"><i class="layui-icon">&#xe642;</i>修改</a>
        {{#  } else { }}
             <a class="layui-btn layui-btn-xs" lay-event="exitInRoomInfo"><i class="layui-icon">&#xe6af;</i>退房</a>
             <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
        {{#  } }}
    </script>
    <!--显示性别自定义模板-->
    <script type="text/html" id="templetSex">
        {{#  if(d.gender == 1){ }}
            <font color="blue">男</font>
        {{#  } else { }}
            <font color="#a52a2a">女</font>
        {{#  } }}
    </script>
    <!--显示是否会员自定义模板-->
    <script type="text/html" id="templetIsVip">
        {{#  if(d.isVip == 1){ }}
        <font color="green">是</font>
        {{#  } else { }}
        <font color="red">否</font>
        {{#  } }}
    </script>
    <!--显示退房状态自定义模板-->
    <script type="text/html" id="templetOutRoomStatus">
        {{#  if(d.outRoomStatus == 1){ }}
        <font color="red">已退房</font>
        {{#  } else { }}
        <font color="green">未退房</font>
        {{#  } }}
    </script>
</html>