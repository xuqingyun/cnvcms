
$(document).ready(function () {
	
	//验证是否登录,否则跳转到登录页面
 	$.get("../api/admin/login.check",function(data,status){
		if(status != "success" || data.login != "success"){
			window.location.href="login.html"; 
		}
 	});
 	
	//UserManage事件响应
	$("#user_manage").click(function(){
		$("#right_panel_iframe").attr("src","user_panel.html");
	});
	
	//GroupManage事件响应
	$("#group_manage").click(function(){
		$("#right_panel_iframe").attr("src","group_panel.html");
	});
	
	//RoleManage事件响应
	$("#role_manage").click(function(){
		$("#right_panel_iframe").attr("src","role_panel.html");
	});
	
	
	
	$("#text_message").text("2222222");
	//$("#right_panel_iframe").attr("src","user_panel.html");
	
	
	//注意：下面的代码是放在和iframe同一个页面调用
 	$("#right_panel_iframe").load(function(){
 		iframeHeight();
	});
	

});	

function iframeHeight(h){
	if(h==null){
		var mainheight = $("#right_panel_iframe").contents().find("body").height()+30;
	}else{
		mainheight = h;
	}
	if(mainheight<400){
		mainheight = 400;
	}
	$("#right_panel_iframe").height(mainheight);
}
function loginout(){
	$.get("../api/admin/login.out",function(data,status){
		if(status == "success"){
			window.location.href="login.html";	
		}
	
 	});
}