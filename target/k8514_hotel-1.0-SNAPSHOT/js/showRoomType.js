layui.use(['element','layer','laypage','form'], function(){
    var element = layui.element
        ,layer = layui.layer
        ,laypage = layui.laypage
        ,form = layui.form
        ,$ = layui.jquery;

    //总的记录条数
    var counts;

    var checkRoomTypeNameIf = false;

    var checkDelIf = true;

    var currentPage = 1;

    //初始化
    loadRoomType(currentPage,4);
    //初始化手动渲染分页容器
    loadPage();

    //执行一个laypage实例
    function loadPage(){
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: counts //数据总数，从服务端得到
            ,limit:4
            ,limits:[2,4,8]
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            ,jump: function(obj, first){
                currentPage = obj.curr;
                //首次不执行
                if(!first){
                    loadRoomType(obj.curr,obj.limit);
                }
            }
        });
    }

    //加载房间类型数据
    function loadRoomType(page,limit){
        $.ajax({
            type: 'post',
            url: 'roomType/loadPTByPramas',
            data: {"page":page,"limit":limit},
            async: false,
            success: function (data) {
                counts = data.count;
                var strdiv = ""
                $.each(data.data,function (i,item) {
                    strdiv += '<div class="layui-colla-item" style="margin-top: 15px;">';
                    strdiv += '<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" style="float: right;margin-top: 6px;" value="del" roomTypeId="'+item.id+'"><i class="layui-icon">删除</i></button>';
                    strdiv += '<button type="button" class="layui-btn layui-btn-normal layui-btn-sm" style="float: right;margin-top: 6px;margin-right: 10px;" value="upd" roomTypes="'+item.id+','+item.roomTypeName+','+item.roomPrice+'"><i class="layui-icon">修改</i></button>';
                    strdiv += '<h2 class="layui-colla-title" roomTypeId="'+item.id+'">'+item.roomTypeName+'---'+item.roomPrice+'元/天</h2>';
                    strdiv += '<div class="layui-colla-content">';
                    strdiv += '<ul class="site-doc-icon site-doc-anim" id="ul'+item.id+'">';
                    strdiv += '</ul>';
                    strdiv += '</div>';
                    strdiv += '</div>';
                });
                $("#collapseDiv").html(strdiv);
                element.render('collapse');
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //监听折叠
    element.on('collapse(test)', function(data){
        if(data.show){
            var roomTypeId = $(this).attr("roomTypeId");
            //执行根据房屋类型查询房屋信息
            loadRoomsByRoomType(roomTypeId);
        }
    });

    //添加房间类型
    $("#saveRoomTypeBtn").click(function () {
        $("#roomTypeName").val("");
        $("#roomPrice").val("");
        layer.open({
            type:1,
            title:'添加房间类型信息',
            area:['560px','320px'],
            anim: 2,
            shade :0.5,
            content:$("#saveRoomTypeDiv")
        });
    });

    //验证输入的房屋类型
    $("#roomTypeName").blur(function () {
        var roomTypeName = $(this).val();
        if(roomTypeName!=""){
           checkRoomTypeName(roomTypeName);
        }
    });

    //提交添加房间
    form.on('submit(demo3)', function(data) {
        if(checkRoomTypeNameIf){
            var jsonRoomType = data.field
            saveRoomType(jsonRoomType);
        }else{
            layer.msg("输入有误，重新输入！！！",{icon:3,time:2000,anim: 6,shade:0.3});layer
        }
        return false;
    });

    $("#collapseDiv").on("click","button",function () {
       var event = $(this).val();
       if(event=='del'){
           var roomTypeId = $(this).attr("roomTypeId");
           layer.confirm("您真的要删除此房屋类型吗？",function (index) {
               checkDel(roomTypeId);
               layer.close(index);
           });
       }else{
           console.log("修改");
           var arrRoomTypes = $(this).attr("roomTypes").split(",");
           $("#updRoomId").val(arrRoomTypes[0]);
           $("#updRoomTypeName").val(arrRoomTypes[1]);
           $("#updRoomPrice").val(arrRoomTypes[2]);
           layer.open({
               type:1,
               title:'房间类型修改',
               area:['560px','320px'],
               anim: 3,
               shade :0.3,
               content:$("#updRoomTypeDiv")
           });
       }
        return false;
    });

    //提交修改房间
    form.on('submit(demo4)', function(data) {
        var jsonRoomType = data.field
        layer.closeAll();
        updRoomType(jsonRoomType);
        return false;
    });


    //根据房屋类型查询房屋信息
    function loadRoomsByRoomType(roomTypeId){
        $.ajax({
            type: 'post',
            url: 'rooms/loadManyTByPramas',
            data: {"roomType.id":roomTypeId},
            async: false,
            success: function (data) {
                var liStr = ""
                $.each(data,function (i,item) {
                    liStr += '<li>';
                    if(item.roomStatus=="0"){
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring">';
                    }else if(item.roomStatus=="1"){
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring" style="background-color: red;">';
                    }else{
                        liStr += '<div class="layui-anim" data-anim="layui-anim-scaleSpring" style="background-color: blueviolet">';
                    }
                    liStr += '<span>'+item.roomNum+'-'+item.roomType.roomTypeName+'</span>';
                    liStr += '</div>';
                    liStr += '<div class="code">';
                    if(item.roomStatus=="0"){
                        liStr += '空闲';
                    }else if(item.roomStatus=="1"){
                        liStr += '已入住';
                    }else{
                        liStr += '打扫';
                    }
                    liStr += '</div>';
                    liStr += '</li>';
                });
                $("#ul"+roomTypeId).html(liStr);
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //验证房间类型
    function checkRoomTypeName(roomTypeName){
        $.ajax({
            type: 'post',
            url: 'roomType/loadTByPramas',
            data: {"roomTypeName":roomTypeName},
            async: false,
            success: function (data) {
                if(data!=""){
                    layer.tips('该房间类型名称已存在!', '#roomTypeName', {tips:  [2, '#c00']});
                    checkRoomTypeNameIf = false;
                }else{
                    layer.tips('该房间类型名称可用。', '#roomTypeName', {tips:  [2, '#38f71b']});
                    checkRoomTypeNameIf = true;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    function saveRoomType(jsonRoomType) {
        $.ajax({
            type: 'post',
            url: 'roomType/insertT',
            data: jsonRoomType,
            success: function (data) {
                layer.closeAll();
                if(data=="success"){
                    loadRoomType(1,4);
                    loadPage();
                    layer.msg("房间类型添加成功。。。",{icon:1,time:2000,anim: 4,shade:0.3});
                }else{
                    layer.msg("房间类型添加失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //判断房间类型下是否有房间
    function checkDel(roomTypeId){
        console.log(roomTypeId);
        $.ajax({
            type: 'post',
            url: 'rooms/loadCountsByPramas',
            data: {"roomType.id":roomTypeId},
            async: false,
            success: function (data) {
                if(data>0){
                    layer.msg('该房间类型已存在房间，不能删除!',{icon:2,time:2000,anim: 6,shade:0.3});
                    checkDelIf = false;
                }else{
                    delRoomTypeById(roomTypeId);
                    checkDelIf = true;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //根据id删除单个房间类型
    function delRoomTypeById(roomTypeId) {
        $.ajax({
            type: 'post',
            url: 'roomType/delTByPrimaryKey',
            data: {"id":roomTypeId},
            async: false,
            success: function (data) {
                if(data=="success"){
                    loadRoomType(currentPage,4);
                    loadPage();
                    layer.msg('该房间类型删除成功。。。',{icon:1,time:2000,anim: 2,shade:0.3});
                }else{
                    layer.msg('该房间类型删除失败！！!',{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //修改房间类型信息
    function updRoomType(jsonRoomType) {
        $.ajax({
            type: 'post',
            url: 'roomType/updateTByPrimaryKeySelective',
            data: jsonRoomType,
            async: false,
            success: function (data) {
                if(data=="success"){
                    loadRoomType(currentPage,4);
                    loadPage();
                    layer.msg('该房间类型修改成功。。。',{icon:1,time:2000,anim: 2,shade:0.3});
                }else{
                    layer.msg('该房间类型修改失败！！!',{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

});