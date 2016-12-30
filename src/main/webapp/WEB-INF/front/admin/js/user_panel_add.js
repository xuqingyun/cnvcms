
function showUserAdd(){
	showGroupBox("#div_groups_checkbox",null);
	showRoleBox("#div_roles_checkbox",null);
};
function userAdd(){
    // 获取表单中的参数
	var d = new Date();
	var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	//alert(date);
	 var gids=new Array(),i=0;
	 $("#group_checkbox:checked").each(function (index, domEle){
		 //var t =  $(domEle);
		 gids[i++] = $(domEle).attr("groupid");
	 });
	  var rids=new Array();
	  i=0
	  $("#role_checkbox:checked").each(function (index, domEle){
		  //var t =  $(domEle);
		  rids[i++] = $(domEle).attr("roleid");
	 });
	  
	 var user = { 
		'username': $("#input_username").val(), 
		'password': $("#input_password").val(), 
		'nickname': $("#input_nickname").val(), 
		'email': 	$("#input_email").val(), 
		'phone': 	$("#input_phone").val(), 
		'status': 	"1", 
		'createDate': date,
		'groupIDs':	gids,
		'roleIDs':	rids
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/user/add", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(user), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='user_panel.html';
			 
			}else{
				alert("添加失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("添加失败！\nstatus:"+msg.status);
	     }
	  });
 
};

$(document).ready(function() {
	
	showUserAdd();
	
	$("#form_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();

		
		userAdd();
		//ftest();
	});
	
});