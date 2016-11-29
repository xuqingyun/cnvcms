function showUserEdit(itemid){

	if(itemid == null | itemid == ""){
		window.location.href = "user_panel.html"
	}
 	$.get("../api/user/detail/"+itemid,function(data,status){
	 	
		if(status == "success"){
				
			var user = data.user;
			//ID放在username标签的itemid属性里
			$("#input_username").attr("itemid",itemid);
			$("#input_username").attr("value",user.username);
			$("#input_nickname").attr("value",user.nickname);
			$("#input_email").attr("value",user.email);
			$("#input_phone").attr("value",user.phone);
			$("#input_status").val(user.status);
				
			$("#input_createDate").attr("value",user.createDate);
			
			showGroupBox('#div_groups_checkbox',data.groupids);
			showRoleBox('#div_roles_checkbox',data.roleids);
			
		}
	
 	});
};

function userEditSubmit(){
    // 获取表单中的参数
	//var table = $('#dataTables-user').DataTable();
	
	 var gids=new Array();
	 $("#group_checkbox:checked").each(function (index, domEle){
		 gids[index] = $(domEle).attr("groupid");
	 });
	  var rids=new Array();
	  $("#role_checkbox:checked").each(function (index, domEle){
		  rids[index] = $(domEle).attr("roleid");
	 });
	 
	 var s = $("#input_status").val();
	 var user = { 
		'id': $("#input_username").attr("itemid"), 
		'username': $("#input_username").val(), 
		'password': $("#input_password").val(), 
		'nickname': $("#input_nickname").val(), 
		'email': 	$("#input_email").val(), 
		'phone': 	$("#input_phone").val(), 
		'status': 	$("#input_status").val(), 
		'createDate': $("#input_createDate").val(),
		'groupIDs':	gids,
		'roleIDs':	rids
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/user/update/"+$("#input_username").attr("itemid"), 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(user), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				 //table.ajax.reload( null, false );
				 window.location.href='user_panel.html';
			}else{
				alert("更新失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("更新失败！\najax错误,status:"+msg.status+"\n"+msg.responseText);
	     }
	  });
 
};
$(document).ready(function () {
	loadNavigation();
	loadNavigation();

    showUserEdit(getUrlParam("id"));
    
	$("#form_submit").on("click", function(event){
		//取消事件行为
		event.preventDefault();
		userEditSubmit();
	});	
});		