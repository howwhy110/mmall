$(function () {
    $.ajax({
        url: "logreg.html",
        type: "get",
        success: function (result) {
            $(result).replaceAll("#logreg");
            $(`<link rel="stylesheet" type="text/css" href="./css/logreg.css"></link>`).appendTo("head");
            // 登陆遮罩层  
            var tips = $(".tips");
            $("#logsub").click(function () {
                $(".alphaGround").addClass("showGround");
                $(".alphaGround").removeClass("offGround");
                $(".centerBlack").addClass("showCenterBlack");
                $(".centerBlack").removeClass("offCenterBlack");
                tips.text("");
            })
            $(".top>.close").click(function () {
                $(".alphaGround").addClass("offGround");
                $(".alphaGround").removeClass("showGround");
                $(".centerBlack").addClass("offCenterBlack");
                $(".centerBlack").removeClass("showCenterBlack");
                $("input").val("");
            })
            var $main = $(".main");
            //登陆界面
            $(".phoneReg").click(function () {
                $main.animate({
                    "margin-left": "-400px"
                }, "fast");
            })
            //忘记密码界面
            $(".fgtpwd").click(function () {
                $main.animate({
                    "margin-left": "-800px"
                }, "fast")
            })
            // 移动到用手机号注册新账号
            $(".mBtn>div:first-child").click(function () {
                $main.animate({
                    "margin-top": "-500px"
                }, "fast")
            })
            //移动到qq，微信登陆页面
            $(".back").click(function () {
                $main.animate({
                    "margin-left": "0"
                }, "fast")
                tips.text("");

            })
            //从手机号注册返回到上一层
            $(".back2").click(function () {
                $main.animate({
                    "margin-top": "0"
                }, "fast")
                tips.text("");

            })
            //注册页面手机号失焦判断
            $("#uphone").blur(function () {
                var uphone = $(this).val();
                var testphone = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (testphone.test(uphone)) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/user/phone",
                        type: "get",
                        data: {
                            uphone
                        },
                        success: function (result) {
                            var tips = $(".tips");

                            console.log(result);
                            if (result == 0) {
                                tips.text("手机号可用").css("color", "#3e3");
                                // $("#phone").attr("data-bool","true");


                            } else {
                                tips.text("手机号已被使用").css("color", "#f00");
                                // $("#phone").attr("data-bool","false");

                            }
                        }

                    })
                } else if (uphone != "") {
                    tips.text("输入的手机号不符合规范").css("color", "#f00");
                } else {
                    tips.text("手机号不能为空").css("color", "#f00");
                }

                // 注册页面密码失焦判断
                $("#upwd").blur(function () {
                    var upwd = $(this).val();
                    var testupwd = /^\w{6,30}$/;
                    
                    if (upwd == "") {
                        tips.text("");
                    } else if (testupwd.test(upwd)) {
                        tips.text("密码符合规范").css("color", "#3e3");
                    } else {
                        tips.text("密码不合规范，请重新输入！").css("color", "#f00");
                        // $(".submit").attr({"disabled":"disabled"});
    
                    }
                });
            });
            //注册手机账号
            $("#acreg").click(function(){
                var uphone=$("#uphone").val();
                var upwd=$("#upwd").val();
                var nickname=$("#nickname").val();
                $.ajax({
                    url: "http://127.0.0.1:3000/user/phone",
                    type: "get",
                    data: {
                        uphone
                    },
                    success:function(result){
                        console.log(result);
                        var testphone = /^[1][3,4,5,7,8][0-9]{9}$/;

                        if(upwd==""){
                            
                            tips.text("密码不能为空").css("color", "#f00");
                                    
                        }
                        if(testphone.test(uphone)&&result==0&&upwd!=""){
                            $.ajax({
                                url:"http://127.0.0.1:3000/user/reg",
                                type:"post",
                                data:{
                                    uphone,
                                    upwd,
                                    nickname
                                },
                                success:function(result){
                                    // var tips = $(".tips");
                                    tips.text("注册成功").css("color", "#3e3");

                                }
                            });
                        }
                    }
                });
            });
            //登陆手机账号
            $("#login").click(function(){
                var uphone=$("#lphone").val();
                var upwd=$("#lupwd").val();
                $.ajax({
                    url:"http://127.0.0.1:3000/user/login",
                    type:"post",
                    data:{
                        uphone,
                        upwd
                    },
                    success:function(result){
                        if(result==1){
                            tips.text("登陆成功").css("color", "#3e3");
                        }else{
                            tips.text("用户名或密码错误").css("color", "#f00");
                        }
                    }
                });
            });



        }

    })
})
