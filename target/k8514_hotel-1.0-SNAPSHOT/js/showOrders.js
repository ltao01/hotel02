layui.use(['table','element','layer','laydate','form'],function(){
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    //条件查询的json参数对象
    var loadJsonOrders = {};

    //初始化员工信息
    loadOrders(loadJsonOrders);

    //日期时间范围
    laydate.render({
        elem: '#test10'
        ,type: 'datetime'
        ,format: 'yyyy/MM/dd HH:mm:ss'
        ,btns: ['clear','confirm']
        ,range: '至'
    });

    function loadOrders(loadJsonOrders){
         table.render({
            elem: '#demo'
            ,height: 450
            ,width: 1485
            ,where: loadJsonOrders
            ,url: 'orders/loadPTByPramas' //数据接口
            ,limit:6
            ,limits:[3,6,10]
            ,even: true
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{type: 'numbers',title: '序号',width:50,align:'center'}
                ,{field: 'orderNum', title: '订单编号', width:230, sort: true,align:'center'}
                ,{field: 'customerName', title: '客人姓名', width:110,align:'center',templet: '<div>{{d.inRoomInfo.customerName}}</div>'}
                ,{field: 'idcard', title: '身份证号', width:200, sort: true,align:'center',templet: '<div>{{d.inRoomInfo.idcard}}</div>'}
                ,{field: 'isVip', title: '会员', width:60,templet: '#templetIsVip',align:'center'}
                ,{field: 'phone', title: '手机号', width: 150,align:'center',templet: '<div>{{d.inRoomInfo.phone}}</div>'}
                ,{field: 'createDate', title: '下单时间', width:180,sort: true,align:'center'}
                ,{field: 'orderMoney', title: '订单总价', width:100,align:'center', event: 'setOrderMoney'}
                ,{field: 'remark', title: '备注', width: 120, sort: true,align:'center'}
                ,{field: 'orderStatus', title: '状态', width: 100, sort: true,align:'center',templet: '#templetOrderStatus'}
                ,{fixed: 'right',title: '操作', width:110, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {

            }
        });
    }

    //监听单元格事件
    table.on('tool(test3)', function(obj){
        var data = obj.data;  //选中的整行数据
        var layEvent = obj.event;
        if(layEvent === 'setOrderMoney'){
            if(data.orderStatus!=1){
                layer.prompt({   //弹框
                    formType: 2
                    ,title: '修改客户 ['+ data.inRoomInfo.customerName +'] 的订单总价'
                    ,value: data.orderMoney
                }, function(value, index){
                    if(data.orderMoney>value){
                        if(value>0){
                            //这里一般是发送修改的Ajax请求
                            var jsonOrders = {};
                            jsonOrders['id'] = data.id;
                            jsonOrders['orderMoney'] = value;
                            updOrdersMoney(jsonOrders,obj);
                            layer.close(index);
                        }else{
                            layer.msg("修改的价格要大于0！！！",{icon:3,time:2000,anim: 6,shade:0.3});
                        }
                    }else{
                        layer.msg("修改后的价格要小于原价或者输入错误！！！",{icon:3,time:2000,anim: 6,shade:0.3});
                    }
                });
            }else{
                layer.msg("此订单已结算，无法修改总价！！！",{icon:2,time:2000,anim: 6,shade:0.3});
            }
        }else if(layEvent=="pay"){   //支付
            layer.confirm('您确定取支付此订单吗？', function(index){
                window.open("orders/toOrdersPay?orderNum="+data.orderNum+"&orderMoney="+data.orderMoney);
                layer.close(index);  //关闭弹框
            });
        }else if(layEvent=="del"){   //单个删除

        }
    });

    form.on('submit(demo2)', function(data){
        loadJsonOrders = {};  //把之前的条件清除掉
        loadJsonOrders["orderStatus"] = data.field.orderStatus;
        loadJsonOrders["orderNum"] = data.field.orderNum;
        if(data.field.times!=""){
            var arrTime = data.field.times.split(" 至 ");
            loadJsonOrders["startTime"] = arrTime[0];
            loadJsonOrders["endTime"] = arrTime[1];
        }
        console.log(loadJsonOrders);
        loadOrders(loadJsonOrders);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //修改订单总价
    function updOrdersMoney(jsonOrders,obj){
        $.ajax({
            type: 'post',
            url: 'orders/updateTByPrimaryKeySelective',
            async: false,
            data: jsonOrders,
            success: function (data) {
                if(data=="success"){
                    //同步更新表格和缓存对应的值
                    obj.update({
                        orderMoney: jsonOrders.orderMoney
                    });
                    layer.msg("订单总价修改成功。。。",{icon:1,time:2000,anim: 2,shade:0.3});
                }else{
                    layer.msg("订单总价修改失败！！！",{icon:2,time:2000,anim: 4,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }



});