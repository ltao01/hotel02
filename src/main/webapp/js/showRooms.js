layui.use(['jquery','table','element','layer','laydate','form'],function(){
    var $ = layui.$
    form = layui.form;

    loadRoomsByRoomStatus("0");
    loadRoomsByRoomStatus("1");
    loadRoomsByRoomStatus("2");

    var checkRoomNumIf = false;

    //操作空闲的房间
    $("ul").eq(0).on("click","button",function () {
        var event = $(this).val();
        var objBtn = $(this);
        if(event=="del"){
            //执行ajax的删除
            layer.confirm("您真的要删除此房间吗？",function (index) {
                delRoomsById(objBtn);
                layer.close(index);
            });
        }else {
            //把房屋类型全查询
          /*  if($("#roomType").text()==""){
                loadRoomType();
            }*/
            loadRoomType();
            layer.open({
                type:1,
                title:'添加客房信息',
                area:['560px','320px'],
                anim: 3,
                shade :0.5,
                content:$("#saveRoomsDiv")
            });
        }
    });

    //验证输入房间号
    $("#roomNum").blur(function () {
        //去后台验证房间号
        checkRoomNum($(this).val());
    });

    //提交添加房间
    form.on('submit(demo3)', function(data) {
        if(checkRoomNumIf){
            var jsonRooms = data.field
            jsonRooms['roomStatus'] = "0";
            saveRooms(jsonRooms);
        }else{
            layer.msg("输入有误，重新输入！！！",{icon:3,time:2000,anim: 6,shade:0.3});layer
        }
        return false;
    });

        //操作打扫的房间
    $("ul").eq(2).on("click","button",function () {
        var event = $(this).val();
        var objBtn = $(this);
        if(event=="del"){
            //执行ajax的删除
            layer.confirm("您真的要删除此房间吗？",function (index) {
                delRoomsById(objBtn);
                layer.close(index);
            })
        }else{
            //执行ajax的修改
            layer.confirm("您真的要把此房间变为空闲的吗？",function (index) {
                //执行页面删除操作
                updRoomsRoomStatusById(objBtn);
                layer.close(index);
            })
        }

    });

    //根据条件查询多个房间
    function loadRoomsByRoomStatus(roomStatus) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadManyTByPramas',
            data: {"roomStatus":roomStatus},
            success: function (items) {
                var liStr = "";
                if(roomStatus=="0"){  //加载的空闲的
                    $.each(items,function (i,item) {
                        liStr += '<li>';
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring">';
                        liStr += '<span>'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        liStr += '</div>';
                        liStr += '<div class="code">';
                        liStr += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        liStr += '</div>';
                        liStr += '</li>';
                    });
                    liStr += '<li><button type="button" value="save" class="layui-btn layui-btn-warm layui-btn-lg"><i class="layui-icon">&#xe654;</i>添加</button></li>';
                }else if(roomStatus=="1"){  //加载的入住的
                    $.each(items,function (i,item) {
                        liStr += '<li>';
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring" style="background-color: red;">';
                        liStr += '<span>'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        liStr += '</div>';
                        liStr += '</li>';
                    });
                }else{
                    $.each(items,function (i,item) {  //加载的打扫的
                        liStr += '<li>';
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring" style="background-color: blueviolet">';
                        liStr += '<span>'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        liStr += '</div>';
                        liStr += '<div class="code">';
                        liStr += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        liStr += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        liStr += '</div>';
                        liStr += '</li>';
                    });
                }
                $("ul").eq(parseInt(roomStatus)).html(liStr);
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //根据id删除房间
    function delRoomsById(objBtn) {
        $.ajax({
            type: 'post',
            url: 'rooms/delTByPrimaryKey',
            data: {"id":objBtn.attr("roomid")},
            success: function (data) {
                if(data=="success"){
                    //执行页面删除操作
                    objBtn.parent().parent().remove();
                    layer.msg("房间删除成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg("房间删除失败！！！",{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //执行修改房间状态
    function updRoomsRoomStatusById(objBtn){
        var jsonRooms = {};
        jsonRooms['id'] = objBtn.attr("roomid");
        jsonRooms['roomStatus'] = "0"
        $.ajax({
            type: 'post',
            url: 'rooms/updateTByPrimaryKeySelective',
            data: jsonRooms,
            success: function (data) {
                if(data=="success"){
                     loadRoomsByRoomStatus("0");
                     loadRoomsByRoomStatus("2");
                    layer.msg("房间修改成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg("房间修改失败！！！",{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //加载所有房间类型
    function loadRoomType(){
        $.ajax({
            type: 'post',
            url: 'roomType/loadAll',
            success: function (data) {
                var strOpt = ""
                $.each(data,function (i,item) {
                    strOpt += '<option value="'+item.id+'">';
                    strOpt += item.roomTypeName+'--'+item.roomPrice;
                    strOpt += '元/天</option>';
                });
                $("#roomType").html(strOpt);
                form.render("select");
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //验证房间号
    function checkRoomNum(roomNum) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadTByPramas',
            data: {"roomNum":roomNum},
            async: false,
            success: function (data) {
                if(data!=""){
                    layer.tips('该房间号已存在！！！', '#roomNum', {tips:  [2, '#c00']});
                    checkRoomNumIf = false;
                }else{
                    layer.tips('该房间号可用。。。', '#roomNum', {tips:  [2, '#38f71b']});
                    checkRoomNumIf = true;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //添加房屋
    function saveRooms(jsonRooms) {
        $.ajax({
            type: 'post',
            url: 'rooms/insertT',
            data: jsonRooms,
            success: function (data) {
                layer.closeAll();
                if(data=="success"){
                    loadRoomsByRoomStatus("0");
                    layer.msg("房间添加成功。。。",{icon:1,time:2000,anim: 4,shade:0.3});
                }else{
                    layer.msg("房间添加失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }
});