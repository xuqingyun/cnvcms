function showRoleOrGroupBox(strbox,boxid,rids){
 	$.get(getContextPath()+"/api/"+strbox+"/"+strbox+"s",function(data,status){
		 	
			if(status == "success"){
				var roles = data.data;
				var str="";
				for(i in roles){
					var role = roles[i];
					str += '<label class="checkbox-inline"><input id="'+strbox+'_checkbox" itemid="'+role.id
					+'" type="checkbox">'+role.name+'</input></label>';
				}

				$(boxid).empty();
				$(boxid).append(str);
				
				for(i in rids){
					var id = '#'+strbox+'_checkbox[itemid="'+rids[i]+'"]';
					$(id).attr("checked",'true');
				}
				
			}
	 	});
}
function showUserEdit(){

	
 	$.get(getContextPath()+"/api/admin/selfinfo",function(data,status){
	 	
		if(status == "success"){
				
			var user = data.data;
			//ID放在username标签的itemid属性里
			$("#input_username").attr("itemid",user.id);
			$("#input_username").attr("value",user.username);
			$("#input_nickname").attr("value",user.nickname);
			$("#input_email").attr("value",user.email);
			$("#input_phone").attr("value",user.phone);
			$("#input_status").val(user.status);
				
			$("#input_createDate").attr("value",user.createDate);
			
			showRoleOrGroupBox('group','#div_groups_checkbox',user.groupIDs);
			showRoleOrGroupBox('role','#div_roles_checkbox',user.roleIDs);
			///showRoleBox('#div_roles_checkbox',data.roleids);
			
		}
	
 	});
};

function userEditSubmit(){
    // 获取表单中的参数
	//var table = $('#dataTables-user').DataTable();
	
	 var gids=new Array();
	 $("#group_checkbox:checked").each(function (index, domEle){
		 gids[index] = $(domEle).attr("itemid");
	 });
	  var rids=new Array();
	  $("#role_checkbox:checked").each(function (index, domEle){
		  rids[index] = $(domEle).attr("itemid");
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
	     url:getContextPath()+"/api/user/update/"+$("#input_username").attr("itemid"), 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(user), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				 //table.ajax.reload( null, false );
				 window.location.href=getContextPath()+'/user/home.html';
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


    showUserEdit();
    
	$("#form_submit").on("click", function(event){
		//取消事件行为
		event.preventDefault();
		userEditSubmit();
	});	
});		