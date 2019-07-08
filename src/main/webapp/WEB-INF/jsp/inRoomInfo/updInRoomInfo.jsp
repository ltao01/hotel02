<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/6/2 0002
  Time: 23:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!--入住信息修改div-->
<div style="display: none;margin-top: 20px;" id="updInRoomInfoDiv">
    <form class="layui-form layui-form-pane" action="" lay-filter="updInRoomInfoForm" style="margin-left: 50px;">
        <input type="hidden" name="inRoomInfo_id" id="inRoomInfo_id"/>
        <!--存放入住信息原始数据-->
        <input type="hidden" name="oldRoomNum" id="oldRoomNum"/>
        <input type="hidden" name="oldPhone" id="oldPhone"/>
        <div class="layui-form-item">
            <label class="layui-form-label">原房间号：</label>
            <div class="layui-input-inline">
                <input type="text" name="rooms.roomNum" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">选择房间：</label>
            <div class="layui-input-inline">
                <select name="selRoomNum" id="selRoomNumId" lay-filter="selRoomNum1"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">手机号：</label>
            <div class="layui-input-inline">
                <input type="text" name="phone" lay-verify="required|phone1" placeholder="请输入手机号" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit="" lay-filter="demo1">确认修改</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>
</body>
</html>
