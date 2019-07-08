layui.use(['table','element','layer','laydate','form'],function(){
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    //条件查询的json参数对象
    var loadJsonRoomSale = {};

    //初始化员工信息
    loadRoomSale(loadJsonRoomSale);

    function loadRoomSale(loadJsonRoomSale){
         table.render({
            elem: '#demo'
            ,height: 450
            ,width: 1485
            ,where: loadJsonRoomSale
            ,url: 'roomSale/loadPTByPramas' //数据接口
            ,limit:8
            ,limits:[6,8,12]
            ,even: true
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{type: 'numbers',title: '序号',width:50,align:'center'}
                ,{field: 'roomNum', title: '房间编号', width:100, sort: true,align:'center'}
                ,{field: 'customerName', title: '客人姓名', width:110,align:'center'}
                ,{field: 'startDate', title: '入住时间', width:200, sort: true,align:'center'}
                ,{field: 'endDate', title: '退房时间', width:200,align:'center'}
                ,{field: 'days', title: '天数', width: 80,align:'center'}
                ,{field: 'roomPrice', title: '房间单价', width:120,sort: true,align:'center'}
                ,{field: 'rentPrice', title: '住宿费', width:120,align:'center'}
                ,{field: 'otherPrice', title: '其他费用', width: 110, sort: true,align:'center'}
                ,{field: 'salePrice', title: '支付费用', width: 120, sort: true,align:'center'}
                ,{field: 'discountPrice', title: '优惠', width: 110, sort: true,align:'center'}
                ,{fixed: 'right',title: '操作', width:110, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {

            }
        });
    }




});