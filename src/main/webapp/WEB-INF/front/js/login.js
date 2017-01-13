/**
 * login.html页面登录验证
 */
	
	
	
	
// 登录验证  
function userLogin(){  
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
        //alert("请重新输入！\n"+msg);  
        $(".error_msg").html(msg);
        //倒计时3秒自动消失
		setTimeout(function(){$(".error_msg").html('');},3000);
		return false;
    }else{  
        // 获取表单中的参数  
        var logindata = { 
			'username': userId.val(), 
			'password': password.val()
		}; 
        
        $.ajax({ 
            type:"POST", 
            //timeout : 100000,
            //async: false,
            url:"api/admin/login", 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(logindata), 
            success:function(data,status){ 
            	if(status == "success" && data.login == "success"){
            		if(data.url == null){
	            		window.location.href="index.html"; 
	            	}else{
	            		window.location.href= data.url; 
	            	}
            		return true;
            		//window.location.replace("index.html"); 
            	}else{
            		alert("登录错误！\nstatus:"+data.error);
            		return true;
    			}
            },
            error:function(msg){
            	alert("登录错误！\nstatus:"+msg.status);
            	//window.location.href="login.html";
                }
             });

            
        }  
 
        };  
        
        
$(document).ready(function(){
	$("#login_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();
		
		userLogin();
		//ftest();
	});    	
    // 为document绑定onkeydown事件监听是否按了回车键  
    // 为document绑定onkeydown事件监听是否按了回车键  
    $(document).keydown(function(event){  
        if (event.keyCode === 13){ // 按了回车键  
            $("#login_submit").trigger("click");  
        } 
    }); 
});