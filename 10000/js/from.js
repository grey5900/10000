/**
 * @author Grey
 */
$(function(){
    //表单验证插件 v1.9.0 http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    //用户名正则
    $.validator.addMethod("validusername", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_]{1,30}$/.test(value);
	}, "User Name Error."
    );

    //用户名正则
    $.validator.addMethod("validpassword", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\\\|\;\:\'\"\<\>\,\.\/\?]{2,15}$/.test(value);
	}, "Password Error."
    );
   
    //自定义方法检测用户名是否可用，示例：checkusername: true
    // $.validator.addMethod("checkusername", function(value, element) {
    //     var check = false;
    //     $.ajax({
    //         type: "GET",
    //         url: "/check_username/"+value,
    //         async: false,
    //         cache: false,
    //         dataType: "json",
    //         success: function(data){
    //             if (data.code == 1){
    //                 check = true;
    //             }
    //         }
    //     })
    //     return check;
    // });

    // $.validator.addMethod("checkemail", function(value, element) {
    //     var check = false;
    //     $.ajax({
    //         type: "POST",
    //         url: "/check_email/",
    //         async: false,
    //         data: "email="+value,
    //         cache: false,
    //         dataType: "json",
    //         success: function(data){
    //             if (data.code == 1){
    //                 check = true;
    //             }
    //         }
    //     });
    //     return check;
    // });
    
    // $.validator.addMethod("checkcaptcha", function(value, element) {
    //     var check = false;
    //     $.ajax({
    //         type: "POST",
    //         url: "/check_captcha/",
    //         async: false,
    //         data: "captcha="+value,
    //         cache: false,
    //         dataType: "json",
    //         success: function(data){
    //             if (data.code == 1){
    //                 check = true;
    //             }
    //         }
    //     })
    //     return check;
    // });

    
    //登录表单
    $('#signin-form').validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            verifycode: {
                required: true
                //checkcaptcha: true
            }
        },
        messages: {
            username: {
                required: '请输入用户名'
            },
            password: {
                required: '请输入密码'
            },
            verifycode: {
                required: '请输入验证码'
                //checkcaptcha: '验证码不正确'
            }
        },
        highlight: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("valid success valid")
                    .addClass("error");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("valid success valid")
                    .addClass("error");
            }
        },
        unhighlight: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("valid");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("valid");
            }
        },
        success: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("success");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("success");
            }
        },
        submitHandler: function(form) {
            var $submit = $(form).find('input[type=submit]');
            $submit.button('loading');
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: $(form).serialize(),
                dataType: "json",
                success: function(data) {
                    if(data.code == 1) {
                    	if(data.refer != "")
                    		window.location.href = data.refer;
                    	else
                    		window.location.reload();
                    }else{
                    	$(".alert-error").html(data.msg);
                        $(".alert-error").show();
			            $submit.button('reset');
                    }
                }
            });
            return false;
        }
    });

    
    //注册表单
    $('#login-form').validate({
        rules: {
            username: {
                required: true,
                checkusername: true,
                validusername: true
            },
            address: {
                minlength: 4,
                required: true
            },
            phone: {
                number: true,
                required: true
            },
            email: {
                email: true,
                checkemail: true
            },
            empirical: {
                empirical: true
            },
            verifycode: {
                required: true
                //checkcaptcha: true
            }

        },
        messages: {
            username: {
                required: '请输入公司名称',
                checkusername: '公司名称已注册，请直接<a href="../signin.html">登录</a>或更换公司名称',
                validusername: '用户名不合法'
            },
            address: {
                minlength: '请补充更详细的地址',
                required: '请输入公司详细地址'
            },
            phone: {
                number: '请输入正确的电话号码',
                required: '请输入公司联系电话'
            },
            email: {
                email: '请输入正确的邮箱地址',
                checkemail: '公司已注册，请直接<a href="../signin.html">登录</a>或更换邮箱'
            },
            empirical: {
                empirical: '请输入公司运营经验'
            },
            verifycode: {
                required: '请输入验证码'
                //checkcaptcha: '验证码不正确'
            }
        },
        highlight: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("valid success valid")
                    .addClass("error");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("valid success valid")
                    .addClass("error");
            }
        },
        unhighlight: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("valid");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("valid");
            }
        },
        success: function(element) {
            if (element.type === 'radio') {
                this.findByName(element.name)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("success");
            } else {
                $(element)
                    .closest(".control-group")
                    .removeClass("error success valid")
                    .addClass("success");
            }
        },
        submitHandler: function(form) {
            var $submit = $(form).find('input[type=submit]');
            $submit.button("loading");
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: $(form).serialize(),
                dataType: "json",
                complete: function(xhr, textStatus) {
                    $submit.button("reset");
                },
                success: function(data) {
                    $("#messager").messager({
                        message: data.msg,
                        refer: "reload"
                    });
                }
            });
            return false;
        }
    });
});