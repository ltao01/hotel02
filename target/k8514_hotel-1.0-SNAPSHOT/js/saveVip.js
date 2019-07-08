layui.use(['table','element','layer','laydate','form'],function(){
    var table = layui.table,  //表格模块
        element = layui.element,  //选项卡模块
        layer = layui.layer,    //弹框模块
        laydate = layui.laydate,   //日期时间模块
        form = layui.form,   //表单模块
        $ = layui.$;  //JQuery模块

    var checkIdcardIf = false;

    var nowDate;

    //验证身份证号
    $("#idcard").blur(function () {
       var idcard = $(this).val();
       if(new RegExp("/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/").test(idcard)){
           checkIdcard(idcard);
       }else{
           layer.tips('身份证号格式不正确!', '#idcard', {tips:  [2, '#c00']});
           checkIdcardIf = false;
       }
    });

    //监听下拉框的选择
    form.on('select(vipRate)', function(data){
        nowDate = new Date();
        var vipNumStr = getNowDate(nowDate,"","","");
        if(data.value=="0.8"){
            vipNumStr += "01"
        }else{
            vipNumStr += "02"
        };
        $("#vipNum").val(vipNumStr);
    });

    //监听提交
    form.on('submit(demo2)', function(data){
        if(checkIdcardIf){
            var jsonVip = data.field;
            jsonVip['createDate'] = getNowDate(nowDate,"/",":"," ");
            saveVip(jsonVip);
        }else{
            layer.msg("信息填写有误！！！",{icon:3,time:2000,anim: 6,shade:0.3});
        }
        return false;
    });

    //验证身份证号
    function checkIdcard(idcard) {
        $.ajax({
            type: 'post',
            url: 'vip/loadTByPramas',
            data: {"idcard":idcard},
            async: false,
            success: function (data) {
                if(data!=""){
                    layer.tips('该身份证号已注册!', '#idcard', {tips:  [2, '#c00']});
                    checkIdcardIf = false;
                }else{
                    layer.tips('该身份证号可用。', '#idcard', {tips:  [2, '#38f71b']});
                    checkIdcardIf = true;
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //添加会员
    function saveVip(jsonVip) {
        $.ajax({
            type: 'post',
            url: 'vip/insertT',
            data: jsonVip,
            success: function (data) {
                if(data=="success"){
                    layer.msg("会员添加成功。。。",{icon:1,time:2000,anim: 3,shade:0.3});
                    setTimeout('window.location = "model/toShowVip"',2000);
                }else{
                    layer.msg("会员添加失败！！！",{icon:3,time:2000,anim: 1,shade:0.3});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time:2000,anim: 3,shade:0.3});
            }
        });
    }

    //获取当前时间字符串
    function getNowDate(date,sign1,sign2,sign3) {
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
        var currentdate = year + sign1 + month + sign1 + day + sign3 + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }


});