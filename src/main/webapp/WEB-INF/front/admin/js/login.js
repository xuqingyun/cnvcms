/**
 * login.html页面登录验证
 */
$(function(){
    // 登录验证  
    $("#submit").click(function(){  
        // 做表单输入校验  
        var userId = $("#username");  
        var password = $("#password");  
        /* var code = $("#code");   */
        var msg = "";  
        if ($.trim(userId.val()) == ""){  
            msg = "用户名不能为空！";  
            userId.focus();  
        }else if (!/^\w{5,20}$/.test($.trim(userId.val()))){  
            msg = "用户名格式不正确！";  
            userId.focus();  
        }else if ($.trim(password.val()) == ""){  
            msg = "密码不能为空！";  
            password.focus();  
        }else if(!/^\w{6,20}$/.test($.trim(password.val()))){  
            msg = "密码格式不正确！";  
            password.focus();  
        }/*else if ($.trim(code.val()) == ""){  
            msg = "验证码不能为空！";  
            code.focus();  
        } else if (!/^[0-9a-zA-Z]{4}$/.test($.trim(code.val()))){  
            msg = "验证码格式不正确！";  
            code.focus();  
        }  */ 
        if (msg != ""){  
            alert("请重新输入！\n"+msg);  
          //$("#perror").append("<b>Appended text</b>.");
        }else{  
            // 获取表单中的参数  
            var logindata = { 
				'username': userId.val(), 
				'password': password.val(), 
			}; 
            var params = $("#login").serialize();  
            
            $.ajax({ 
                type:"POST", 
                url:"../api/admin/login.json", 
                dataType:"json",      
                contentType:"application/json",               
                data:JSON.stringify(logindata), 
                success:function(data){ 
                	//alert("登录成功！\n"+JSON.stringify(data));
                	var user =  data.login;
                	//alert(user);
                	window.location.href="index.html"; 
                	
                },
                error:function(msg){
                	alert("登录错误！\nstatus:"+msg.status);
                }
             });
            
        }  
 
        });  
    // 为document绑定onkeydown事件监听是否按了回车键  
    $(document).keydown(function(event){  
        if (event.keyCode === 13){ // 按了回车键  
            $("#submit").trigger("click");  
        } 
    }); 
});