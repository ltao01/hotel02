layui.use(['table','element','layer','laydate','form'],function(){
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    //条件查询的json参数对象
    var loadJsonInRoomInfo = {};

    //分页的当前页
    var currentPage = 1;

    var vipRate = 1;  //会员折扣

    var checkRoomsIf = true;

    var updObj;  //修改对象

    //初始化员工信息
    loadInRoomInfo(loadJsonInRoomInfo);

    //定义table对象
    var overInRoomInfoTable;

    function loadInRoomInfo(loadJsonInRoomInfo){
        overInRoomInfoTable = table.render({
            elem: '#demo'
            ,height: 450
            ,width: 1485
            ,where: loadJsonInRoomInfo
            ,url: 'inroominfo/loadPTByPramas' //数据接口
            ,limit:6
            ,limits:[3,6,10]
            ,even: true
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{type: 'numbers',title: '序号',width:50,align:'center'}
                ,{field: 'roomNum', title: '房间号', width:80, sort: true,templet: '<div>{{d.rooms.roomNum}}</div>',align:'center'}
                ,{field: 'roomTypeName', title: '房间类型', width:110,align:'center',templet: '<div>{{d.rooms.roomType.roomTypeName}}</div>'}
                ,{field: 'customerName', title: '客人姓名', width:110, sort: true,align:'center'}
                ,{field: 'gender', title: '性别', width:60,templet: '#templetSex',align:'center'}
                ,{field: 'idcard', title: '身份证号', width: 200,align:'center'}
                ,{field: 'phone', title: '手机号', width: 170, sort: true,align:'center'}
                ,{field: 'isVip', title: '会员', width:60,templet: '#templetIsVip',align:'center'}
                ,{field: 'money', title: '押金', width: 80, sort: true,align:'center'}
                ,{field: 'createDate', title: '入住时间', width: 200, sort: true,align:'center'}
                ,{field: 'outRoomStatus', title: '退房状态', width: 120, sort: true,templet: '#templetOutRoomStatus',align:'center'}
                ,{fixed: 'right',title: '操作', width:170, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {
                currentPage = curr;
            }
        });
    }

    //监听条件类型下拉框
    form.on('select(selectTest)', function(data){
        if(data.value!=""){
            $("#inputPramas").removeAttr("disabled");
        }else{
            $("#inputPramas").val("");
            $("#inputPramas").attr("disabled","disabled");
        }
    });

    //监听条件查询提交
    form.on('submit(demo2)', function(data){
        loadJsonInRoomInfo = {};   //每一次点击查询的时候清空掉以前查询条件
        loadJsonInRoomInfo[data.field.pramasType] = data.field.inputPramas;  //往查询条件对象中加入查询条件
        loadInRoomInfo(loadJsonInRoomInfo);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听表格工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'exitInRoomInfo'){ //退房
            var nowDate = new Date();
            var days = getDays(dateSubstring(data.createDate),dateSubstring(getNowDate(nowDate)));
            if(days>=0) {
                if(days==0){
                    days = 1;
                }
                //1.数据回显
                if (data.isVip == 1) {
                    $("#isVip").val("是");
                    //显示会员卡号
                    loadVipByIdcard(data.idcard);
                } else {
                    $("#isVip").val("否");
                    $("#vipNum").val("无卡号");
                    vipRate = 1;
                }
                $("#otherPrice").val("");
                var strEndTime = "";
                //传入符合format格式的字符给初始值
                var strEndTime = getNowDate(nowDate)
                $("#days").html(days);
                var zprice = days * vipRate * data.rooms.roomType.roomPrice;
                $("#zprice").html(zprice.toFixed(2));
                overTime(nowDate)

                function overTime(date) {
                    laydate.render({
                        elem: '#endDate'
                        , value: date //必须遵循format参数设定的格式
                        // ,type: 'datetime'
                        , format: 'yyyy/MM/dd HH:mm:ss'
                        //   ,min: dateReplace(data.createDate)  //yyyy-MM-dd HH:mm:ss
                        , max: 0
                        , done: function (value) {  //只要laydate首次进来赋值渲染后，后续重新渲染其值都不会变
                            days = getDays(dateSubstring($("#createDate").val()), dateSubstring(value));
                            var otherPrice = $("#otherPrice").val();
                            if (otherPrice == '') {
                                otherPrice = 0
                            } else {
                                otherPrice = parseFloat(otherPrice);
                            }
                            if (days >= 1) {
                                $("#days").html(days);
                                zprice = $("#days").text() * vipRate * $("#onePrice").val() + otherPrice;
                                $("#zprice").html(zprice.toFixed(2));
                                strEndTime = value;
                            } else {
                                $("#endDate").val(strEndTime);
                                layer.msg("您选中退房时间不能在入住时间之前！！！", {icon: 5, time: 2000, anim: 6, shade: 0.3});
                                return false;
                            }
                        }
                    });
                }
                form.val("exitInRoomInfoForm", {  //data本身为inRoomsInfo对象数据
                    "rooms_id": data.rooms.id
                    , "inRoomInfo_id": data.id
                    , "rooms.roomNum": data.rooms.roomNum + '--' + data.rooms.roomType.roomTypeName // "name": "value"
                    , "customerName": data.customerName
                    , "idcard": data.idcard
                    , "rooms.roomType.roomPrice": data.rooms.roomType.roomPrice
                    , "createDate": data.createDate
                })
                //2.将表单弹出
                layer.open({
                    type: 1,
                    title: '确认退房的房间信息',
                    area: ['700px', '550px'],
                    anim: 3,
                    content: $("#exitInRoomInfoDiv")
                });
                //添加其它消费
                $("#otherPrice").blur(function () {
                    var otherPrice = $(this).val();
                    if (isNaN(otherPrice) || otherPrice <= 0) {
                        otherPrice = 0;
                        $("#otherPrice").val("");
                    }
                    var ozprice = $("#days").text() * vipRate * data.rooms.roomType.roomPrice + parseFloat(otherPrice);
                    //  console.log(ozprice);
                    $("#zprice").html(ozprice.toFixed(2));
                });
            }else{
                layer.msg("您的房间还未开始入住，无法退房",{icon:3,time:2000,anim: 6,shade:0.3});
            }
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除此条客房入住数据么？', function(index){
                //向服务端发送删除指令
                delInRoomInfo(data.id,obj);
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //修改入住信息
            //1.数据回显
            form.val("updInRoomInfoForm", {  //data本身为inRoomsInfo对象数据
                "inRoomInfo_id": data.id  //原来的入住id  data是选中的表格行的数据
                ,"oldRoomNum": data.rooms.roomNum  //先把表格中的原始数据存入到修改表单中隐藏起来
                ,"oldPhone": data.phone
                ,"rooms.roomNum": data.rooms.roomNum +'--' +data.rooms.roomType.roomTypeName // "name": "value"
                ,"phone": data.phone
            })
            //查询空闲房屋
            loadRoomsByroomStatus("0",data);
            //2.将表单弹出
            layer.open({
                type:1,
                title:'修改客房入住信息',
                area:['420px','320px'],
                anim: 3,
                content:$("#updInRoomInfoDiv")
            });
            updObj = obj;
        }
    });

    //监听结账退房
    form.on('submit(demo3)', function(data){
        var jsonObj = data.field //得到表单的json数据
     //   console.log(jsonObj);
        var jsonOrders = {};
        jsonOrders['orderMoney'] = $("#zprice").text();
        jsonOrders['remark'] = jsonObj.remark;
        jsonOrders['orderStatus'] = 0;
        jsonOrders['createDate'] = jsonObj.endDate;
        jsonOrders['orderNum'] = dateReplace(jsonObj.endDate)+getNums();
        jsonOrders['flag'] = 1;
        jsonOrders['inRoomInfo.id'] = jsonObj.inRoomInfo_id
        jsonOrders['inRoomInfo.outRoomStatus'] = 1
        jsonOrders['inRoomInfo.rooms.id'] = jsonObj.rooms_id
        jsonOrders['inRoomInfo.rooms.roomStatus'] = 2
        var arrRoomNums = $("#roomsNum").val().split("--");
        jsonOrders['orderOther'] = arrRoomNums[0] +','+jsonObj.customerName+','+jsonObj.createDate + ',' + jsonObj.endDate+ ',' + $("#days").text()
        jsonOrders['orderPrice'] = $("#onePrice").val() + ',' + jsonObj.number + ',' + parseFloat($("#days").text())*vipRate*$("#onePrice").val()
        console.log(jsonOrders);
        saveOrders(jsonOrders);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听入住信息修改
    form.on('submit(demo1)', function(data){
        var jsonObj = data.field //得到表单的json数据
        console.log(jsonObj);  //修改表单中的入住信息最新数据和入住信息原始数据
      //  layer.closeAll();
        //1.房间号未改，手机号也未改
        if(jsonObj.oldRoomNum==jsonObj.selRoomNum&&jsonObj.oldPhone==jsonObj.phone){
            layer.closeAll();
            layer.msg("您的房间和手机号均未改动。。。",{icon:1,time:2000,anim: 3,shade:0.3});
        }
        //2.房间号未改，手机号改动
        if(jsonObj.oldRoomNum==jsonObj.selRoomNum&&jsonObj.oldPhone!=jsonObj.phone){
            var updJsonInRoomInfo = {};
            updJsonInRoomInfo['id'] = jsonObj.inRoomInfo_id;
            updJsonInRoomInfo['phone'] = jsonObj.phone;
            console.log(updJsonInRoomInfo);
            updInRoomInfo(updJsonInRoomInfo);
        }
        //3.房间号改动，手机号未改动
        if(jsonObj.oldRoomNum!=jsonObj.selRoomNum&&jsonObj.oldPhone==jsonObj.phone){
            //验证选中的房间是否空闲
            checkRoomsByroomStatus(jsonObj.selRoomNum);
            if(checkRoomsIf){
                var updJsonInRoomInfo = {};
                updJsonInRoomInfo['id'] = jsonObj.inRoomInfo_id;
                updJsonInRoomInfo['rooms.roomNum'] = jsonObj.oldRoomNum+','+jsonObj.selRoomNum;
                console.log(updJsonInRoomInfo);
                updInRoomInfo(updJsonInRoomInfo);
            }else{
                layer.msg("您选中的房间暂时不能入住！！！",{icon:3,time:2000,anim: 6,shade:0.3});
            }
        }
        //4.房间号手机号均改动
        if(jsonObj.oldRoomNum!=jsonObj.selRoomNum&&jsonObj.oldPhone!=jsonObj.phone){
            //验证选中的房间是否空闲
            checkRoomsByroomStatus(jsonObj.selRoomNum);
            if(checkRoomsIf){
                var updJsonInRoomInfo = {};
                updJsonInRoomInfo['id'] = jsonObj.inRoomInfo_id;
                updJsonInRoomInfo['rooms.roomNum'] = jsonObj.oldRoomNum+','+jsonObj.selRoomNum;
                updJsonInRoomInfo['phone'] = jsonObj.phone;
                console.log(updJsonInRoomInfo);
                updInRoomInfo(updJsonInRoomInfo);
            }else{
                layer.msg("您选中的房间暂时不能入住！！！",{icon:3,time:2000,anim: 6,shade:0.3});
            }
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //自定义验证手机号
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        phone1: [/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,'请输入正确手机号']
    });

    //批量删除
    $("#delBatchBtn").click(function () {
        var data = table.checkStatus('demo').data;
        if(data.length!=0){
            var ids = "";
            for (var i=0;i<data.length;i++){
                if(data[i].outRoomStatus==0){
                    layer.msg("您选中的数据有未退房的，不能删除！！！",{icon:5,time:2000,anim: 3,shade:0.3});
                    return false;
                }
                ids += data[i].id + ",";
            }
            ids = ids.substring(0,ids.length-1);
            layer.confirm('真的批量删除这些客房入住数据么？', function(index){
                delBatchInRoomInfo(ids);
                layer.close(index);  //关闭弹框
            });
        }else{
            layer.msg("您还未选中数据！！！",{icon:3,time:2000,anim: 3,shade:0.3});
        }
    });

    //根据id删除单个客房入住数据
    function delInRoomInfo(id,obj) {
         $.ajax({
             type: 'post',
             url: 'inroominfo/delTByPrimaryKey',
             data: {'id':id},
             success: function (data) {
                if(data=="success"){
                    obj.del();
                    layer.msg("客房入住数据删除成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg("客房入住数据删除失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
             },
             error: function () {
                 layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
             }
         });
    }

    //客房入住数据批量删除
    function delBatchInRoomInfo(ids){
        $.ajax({
            type: 'post',
            url: 'inroominfo/removeBatchTByPrimaryKeys',
            data: {'items':ids},
            success: function (data) {
                if(data=="success"){
                    reloadInRoomInfo();
                    layer.msg("客房入住数据批量删除成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg("客房入住数据批量删除失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //根据身份证号查询会员
    function loadVipByIdcard(idcard) {
        $.ajax({
            type: 'post',
            url: 'vip/loadTByPramas',
            async: false,
            data: {'idcard':idcard},
            success: function (data) {
                $("#vipNum").val(data.vipNum);
                vipRate = data.vipRate;
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //计算天数
    function getDays(startDate,endDate){
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
    }

    //获取当前时间字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //把2019/01/01 12:12:12  -->  2019-01-01
    function dateSubstring(date) {
        var indexOf = date.indexOf(" ");
        date = date.substring(0,indexOf);
        return date;
    }

    //获取6位数的随机数
    function getNums() {
        var nums = "";
        for (var i=0;i<6;i++){
            var count = parseInt(Math.random()*10);
            nums += count;
        }
        return nums;
    }

    //添加订单和修改入住信息状态以及房屋状态（要在一个事务中完成上述操作）
    function saveOrders(jsonOrders){
        $.ajax({
            type: 'post',
            url: 'orders/insertT',
            async: false,
            data: jsonOrders,
            success: function (data) {
                if(data=="success"){
                    reloadInRoomInfo();
                    layer.closeAll();
                    layer.msg("退房成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg("退房失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //刷新表格
    function reloadInRoomInfo() {
        overInRoomInfoTable.reload('test', {
            where: loadJsonInRoomInfo
            ,page: {
                curr: currentPage
            }
        });
    }

    //查询空闲房屋
    function loadRoomsByroomStatus(roomStatus,data) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadManyTByPramas',
            data: {"roomStatus":roomStatus},
            success: function (items) {
                var optStr = '<option selected="" value="'+data.rooms.roomNum+'" id="selectedRoomNum">'+data.rooms.roomNum +'--'+data.rooms.roomType.roomTypeName+'</option>';
                $.each(items,function (i,item) {
                    optStr += '<option value="'+item.roomNum+'">'+item.roomNum +'--'+item.roomType.roomTypeName+'</option>';
                });
                $("#selRoomNumId").html(optStr);
                form.render("select");
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //验证入住信息修改时所选中的房间状态
    function checkRoomsByroomStatus(roomNum) {
        $.ajax({
            type: 'post',
            url: 'rooms/loadTByPramas',
            async: false,
            data: {"roomNum":roomNum},
            success: function (data) {
                if(data.roomStatus!=0){
                    checkRoomsIf = false;
                }else{
                    checkRoomsIf = true;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //完成入住信息的修改
    function updInRoomInfo(updJsonInRoomInfo) {
        $.ajax({
            type: 'post',
            url: 'inroominfo/updateTByPrimaryKeySelective',
            data: updJsonInRoomInfo,
            success: function (data) {
                if(data!=""){
                    if(data=="updPhoneSuccess"){
                        layer.closeAll();
                        updObj.update({
                            phone: updJsonInRoomInfo.phone
                        });
                        layer.msg("您的房间未改动，手机号改动了。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                    }
                    if(data=="updRoomNumSuccess"){
                        reloadInRoomInfo();
                        layer.closeAll();
                        layer.msg("您的房间改动了，手机号未改动。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                    }
                    if(data=="updPhoneSuccessupdRoomNumSuccess"){
                        reloadInRoomInfo()
                        layer.closeAll();
                        layer.msg("您的房间和手机号均改动了。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                    }
                }else{
                    layer.msg("修改失败！！！",{icon:2,time:2000,anim: 6,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

});