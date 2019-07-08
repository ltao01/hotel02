layui.use(['table','element','layer','laydate','form'],function(){
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    //初始化空闲房屋
    loadRoomsByroomStatus("0");

    //选择房间是否空闲
    var roomsIf = false;

    laydate.render({
        elem: '#create_date'
        , value: new Date() //必须遵循format参数设定的格式
        , type: 'datetime'
        , format: 'yyyy/MM/dd HH:mm:ss'
        , min: 0
    });

    //选择是否会员
    form.on('radio(isVip)', function(data){
        if(data.value=="1"){
            $("#vip_num").removeAttr("disabled");
        }else{
            $("#vip_num").val("");
            //1.数据回显
            form.val("example", {  //data本身为inRoomsInfo对象数据
                "customerName": ""  //原来的入住id  data是选中的表格行的数据
                ,"gender": "1"  //先把表格中的原始数据存入到修改表单中隐藏起来
                ,"idcard": ""
                ,"phone": ""// "name": "value"
            })
            $("#vip_num").attr("disabled","disabled");
        }
    });

    //监听提交82003
    form.on('submit(demo1)', function(data){
      //  console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //提交添加时验证当前选择的房间是否空闲
        roomStatusIfByRoomid($("#selRoomNumId").val());
        if(roomsIf){
            //完成数据添加
            var jsonInRoomInfo = data.field;
            jsonInRoomInfo['status'] = "1";
            jsonInRoomInfo['outRoomStatus'] = "0";
            delete jsonInRoomInfo.vipNum;
            console.log(jsonInRoomInfo);
            saveInRoomInfo(jsonInRoomInfo);
        }else{
            layer.msg("您选择的房间已被入住，请重新选择！！！",{icon:2,time:2000,anim: 6,shade:0.3});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    $("#vip_num").blur(function () {
        //查询会员
        loadVipByVipNum($(this).val());
    });

    //根据会员卡号加载单个会员数据
    function loadVipByVipNum(vipNum) {
        $.ajax({
            type: 'post',
            url: 'vip/loadTByPramas',
            data: {'vipNum':vipNum},
            success: function (data) {
                if(data!=""){
                    //1.数据回显
                    form.val("example", {  //data本身为inRoomsInfo对象数据
                        "customerName": data.customerName  //原来的入住id  data是选中的表格行的数据
                        ,"gender": data.gender  //先把表格中的原始数据存入到修改表单中隐藏起来
                        ,"idcard": data.idcard
                        ,"phone": data.phone// "name": "value"
                    })
                    $("#vip_num").attr("disabled","disabled");
                }else{
                    layer.msg("该会员卡号不存在，请重新输入！！！",{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //查询空闲房屋
    function loadRoomsByroomStatus(roomStatus) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadManyTByPramas',
            data: {"roomStatus":roomStatus},
            success: function (items) {
                var optStr = "";
                $.each(items,function (i,item) {
                    optStr += '<option value="'+item.id+'">'+item.roomNum +'--'+item.roomType.roomTypeName+'</option>';
                });
                $("#selRoomNumId").html(optStr);
                form.render("select");
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }
    
    //根据房间id加载房间信息判断是否空闲
    function roomStatusIfByRoomid(roomid) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadTByPrimaryKey',
            data: {"id":roomid},
            async: false,
            success: function (data) {
                if(data.roomStatus=="0"){
                    roomsIf = true;
                }else{
                    roomsIf = false;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //添加入住信息
    function saveInRoomInfo(jsonInRoomInfo) {
        $.ajax({
            type: 'post',
            url: 'inroominfo/insertT',
            data: jsonInRoomInfo,
            success: function (data) {
                if(data=="success"){
                    layer.msg("入住信息添加成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                    setTimeout('window.location = "model/toShowInRoomInfo"',2000);
                }else{
                    layer.msg("入住信息添加失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }
});