layui.use(['table','layer','form'],function(){

    var table = layui.table,  //表格模块
        layer = layui.layer,    //弹框模块
        form = layui.form;   //表单模块

    var dataUrl;

    var arrCheckBox = $(".layui-input-block").find("input");

    //初始化员工信息
    loadRole();

    function loadRole(){
        table.render({
            elem: '#demo'
            ,height: 450
            ,width: 1485
            ,url: 'role/loadPTByPramas' //数据接口
            ,limit:8
            ,limits:[6,8,12]
            ,even: true
            ,page: true //开启分页
            ,cols: [[ //表头
                {type: 'checkbox'}
                ,{type: 'numbers',title: '序号',width:50,align:'center'}
                ,{field: 'roleName', title: '角色名', width:140, sort: true,align:'center'}
                ,{field: 'flag', title: '角色类型', width:140,align:'center',templet: '#templetFlag'}
                ,{field: 'createDate', title: '创建时间', width:210,align:'center'}
                ,{field: 'authoritys', title: '角色权限', width:560, sort: true,align:'center'}
                ,{field: 'status', title: '是否可用', width:140, sort: true,align:'center',templet: '#templetStatus'}
                ,{fixed: 'right',title: '操作', width:180, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            ,done:function (res, curr, count) {

            }
        });
    }

    table.on('tool(test3)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event;
        if(layEvent === 'query'){ //查看
            dataUrl = "authority/loadTreeAuthorityByRoleId?roleId=";
            dataUrl += data.id;
            console.log(dataUrl);
            loadTree();
            layer.open({
                type:1,
                title:'<font color="red">'+data.roleName+'</font>：角色的树形权限显示',
                area:['320px','420px'],
                anim: 3,
                shade :0.6,
                content:$("#ztreeDiv"),
                cancel: function(index, layero){
                    $("#test1").empty();
                }
            });
        } else if(layEvent === 'edit'){ //编辑
            //1.状态恢复不选择
            $.each(arrCheckBox,function (i,checkBox) {
                checkBox.checked = false;
            });
            form.render("checkbox");
            //2.查询已有的权限进行数据回显（查询二级权限）
            loadSecondAuthorityByRoleId(data.id);
            //3.弹框显示
           layer.open({
                type:1,
                title:'<font color="red">'+data.roleName+'</font>：角色权限的修改',
                area:['720px','420px'],
                anim: 4,
                shade :0.5,
                content:$("#updRoleDiv"),
                cancel: function(index, layero){
                   $("#updRoleDiv").hide();
                }
            });
            //4.监听复选框完成角色权限的添加或者移除
            form.on('checkbox(authority)', function(authData){
                var authorityName = $(this).attr("title");
                var jsonRole_Auth = {};
                jsonRole_Auth['roleId'] = data.id;
                if(authData.elem.checked){
                    var arrsubs = $(this).parent().find("input");//找到此权限的所有同级的二级权限
                    var count = 0;
                    $.each(arrsubs,function (i,item) {//循环判断已选中的
                        if(item.checked==true){
                            count++;
                        }
                    });
                    if(count==1){  //添加一级权限和二级权限
                        jsonRole_Auth['authIds'] = authData.value+","+$(this).attr("aPId");
                    }else{   //添加二级权限
                        jsonRole_Auth['authIds'] = authData.value;
                    }
                    console.log(jsonRole_Auth);
                    saveRole_Auth(jsonRole_Auth,authorityName);
                }else{
                    var arrsubs = $(this).parent().find("input");//找到此权限的所有同级的二级权限
                    var count = arrsubs.length;
                    $.each(arrsubs,function (i,item) {  //循环判断未选中的
                        if(item.checked==false){
                            count--;
                        }
                    });
                    if(count==0){  //移除一级权限和二级权限
                        jsonRole_Auth['authIds'] = authData.value+","+$(this).attr("aPId");
                    }else{   //移除二级权限
                        jsonRole_Auth['authIds'] = authData.value;
                    }
                    console.log(jsonRole_Auth);
                    removeRole_Auth(jsonRole_Auth,authorityName);
                }
            });
        }
    });

    //加载权限树形图
    function loadTree() {
        var setting = {
            data : {
                simpleData : {
                    enable : true,
                    idKey : "id",       // 结点的id,对应到Json中的id
                    pIdKey : "parent",     // 结点的pId,对应到Json中的pid
                    rootPId : 0         // 根节点设置为0
                },
                key : {
                    name : "authorityName" // 结点显示的name属性，对应到Json中的rName
                }
            },
            check: {
                enable: true
            },
            async : {
                enable : true,
                url:dataUrl,
                autoParam:["id", "name=n", "level=lv"],
                otherParam:{"otherParam":"zTreeAsyncTest"}
            }
        };
        $.fn.zTree.init($("#test1"), setting);
    }

    //根据角色加载二级权限
    function loadSecondAuthorityByRoleId(roleId){
        $.ajax({
            type: 'post',
            url: 'authority/loadSecondAuthorityByRoleId',
            async: false,
            data: {"roleId":roleId},
            success: function (data) {
                if(data.length!=0){
                    //1.状态回显
                    $.each(data,function (i,authority) {
                        var authorityId = authority.id;
                        $.each(arrCheckBox,function (i,checkBox) {
                            if(authorityId==checkBox.value){
                                checkBox.checked = true;
                                return false;
                            }
                        });
                    });
                    form.render("checkbox");
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //添加角色的一级二级权限
    function saveRole_Auth(jsonRole_Auth,authorityName) {
        $.ajax({
            type: 'post',
            url: 'role_Auth/insertT',
            data: jsonRole_Auth,
            success: function (data) {
                if(data=="success"){
                    layer.msg(authorityName+"权限添加成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                }else{
                    layer.msg(authorityName+"权限添加失败！！！",{icon:2,time:2000,anim: 3,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //移除角色的一级二级权限
    function removeRole_Auth(jsonRole_Auth,authorityName) {
        $.ajax({
            type: 'post',
            url: 'role_Auth/delTByPramas',
            data: jsonRole_Auth,
            success: function (data) {
                if(data=="success"){
                    layer.msg(authorityName+"权限删除成功。。。",{icon:1,time:2000,anim: 1,shade:0.3});
                }else{
                    layer.msg(authorityName+"权限删除失败！！！",{icon:2,time:2000,anim: 1,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

});