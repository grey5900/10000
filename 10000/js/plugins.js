$(function(){
    //表单验证插件 v1.9.0 http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    //用户名正则
    $.validator.addMethod("validusername", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_]{1,15}$/.test(value);
	}, "User Name Error."
    );

    //用户名正则
    $.validator.addMethod("validpassword", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\\\|\;\:\'\"\<\>\,\.\/\?]{2,15}$/.test(value);
	}, "Password Error."
    );
   
    //自定义方法检测用户名是否可用，示例：checkusername: true
    $.validator.addMethod("checkusername", function(value, element) {
        var check = false;
        $.ajax({
            type: "GET",
            url: "/check_username/"+value,
            async: false,
            cache: false,
            dataType: "json",
            success: function(data){
                if (data.code == 1){
                    check = true;
                }
            }
        })
        return check;
    });

    $.validator.addMethod("checkemail", function(value, element) {
        var check = false;
        $.ajax({
            type: "POST",
            url: "/check_email/",
            async: false,
            data: "email="+value,
            cache: false,
            dataType: "json",
            success: function(data){
                if (data.code == 1){
                    check = true;
                }
            }
        });
        return check;
    });
    
    $.validator.addMethod("checkcaptcha", function(value, element) {
        var check = false;
        $.ajax({
            type: "POST",
            url: "/check_captcha/",
            async: false,
            data: "captcha="+value,
            cache: false,
            dataType: "json",
            success: function(data){
                if (data.code == 1){
                    check = true;
                }
            }
        })
        return check;
    });

    
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
      
    //找回密码
    $('#resetpassword-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: "请输入邮箱地址",
                email: "请输入正确的邮箱地址"
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
                	alert(data.msg);
		            $submit.button('reset');
					if( navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) && data.code == 1){
						window.close();
					}else if(data.code == 1) {
                    	window.location.href = "/";
                    }
                }
            });
            return false;
        }
    });

});
