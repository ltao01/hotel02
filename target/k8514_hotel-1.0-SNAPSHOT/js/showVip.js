layui.use(['table','element','layer','laydate','form'],function() {
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    //条件查询的json参数对象
    var loadJsonVip = {};

    //初始化会员信息
    loadVip(loadJsonVip);

    function loadVip(loadJsonVip){
        table.render({
            elem: '#demo'
            ,height: 450
            ,width: 1415
            ,where: loadJsonVip
            ,url: 'vip/loadPTByPramas' //数据接口
            ,limit:6
            ,limits:[3,6,12]
            ,even: true
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{type: 'numbers',title: '序号',width:80,align:'center'}
                ,{field: 'vipNum', title: '会员卡号', width:200, sort: true,align:'center'}
                ,{field: 'customerName', title: '客人姓名', width:110,align:'center'}
                ,{field: 'gender', title: '性别', width:80,align:'center',templet: '#templetSex'}
                ,{field: 'vipRate', title: '折扣', width:80, sort: true,align:'center'}
                ,{field: 'idcard', title: '身份证号', width:220,align:'center'}
                ,{field: 'phone', title: '手机号', width: 180,align:'center'}
                ,{field: 'createDate', title: '登记时间', width:220,sort: true,align:'center'}
                ,{fixed: 'right',title: '操作', width:180, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {

            }
        });
    }

    //监听工具条
    table.on('tool(test3)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

       if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
           //1.数据回显
           form.val("updVipForm", {
               "phone": data.phone // "name": "value"
               ,"vipRate": data.vipRate
           })
           //2.弹框
           layer.open({
               type:1,
               title:'添加房间类型信息',
               area:['560px','320px'],
               anim: 4,
               shade :0.3,
               content:$("#updVipDiv")
           });
            //同步更新缓存对应的值
          /*  obj.update({
                username: '123'
                ,title: 'xxx'
            });*/
        }
    });




});