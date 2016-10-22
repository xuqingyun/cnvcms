$(document).ready(function () {
	//用户添加提交按钮
	$("#add_form_submit").click(function(){
		userAdd();
	});

	//用户编辑提交按钮
	$("#edit_form_submit").live("click",function(){
		var item_type = $("#edit_form").attr("form_type");
		if(item_type == "edit"){
			userEditSubmit();
		}else if(item_type == "detail"){
			var userid =  $("#edit_form").attr('itemid');
			showUserEdit(userid);	
		}
	});
	
	
	
	//列表编辑按钮响应
	$("#item_edit").live("click",function(){
		var itemid = $(this).parent().parent().attr("itemid");
		showUserEdit(itemid);	
	});	

	//列表删除按钮响应
    $("#item_delete").live("click",function(){
    	userDelete(this);
     	
	});
    
	//列表详情
    $("#item_detail").live("click",function(){
    	var itemid = $(this).parent().parent().attr("itemid");
		showUserDetail(itemid);    	
	});
    
  //Table编辑选中项按钮响应
    $("#user_table_selected").live("click",function(){	 	 	
	 	alert("table_selected in user");
	
	});
    
  //Table添加按钮响应
    $("#btn_table_add").live("click",function(){
    	showUserAdd();
	});

    
    showUserTable();
    
});	 

	function showGroupBox(boxid,gids,type){
 	$.get("../api/group/groups",function(data,status){
		 	
			if(status == "success"){
				var groups = data.groups;
				var str="<label>用户组别:</label>";
				for(i in groups){
					var group = groups[i];
					str += '<input id="'+type+'_group_box" flag="edit_input" groupid="'+group.id+'" type="checkbox">'+group.name+'</input>';
					
				}
				/*$("#edit_group_checkbox").empty();
				$("#edit_group_checkbox").append(str);*/
				$(boxid).empty();
				$(boxid).append(str);
				
				for(i in gids){
					$('#'+type+'_group_box[groupid="'+gids[i]+'"]').attr("checked",'true');
				}
				
			}
	 	});
	}
	
	function showRoleBox(boxid,gids,type){
	 	$.get("../api/role/roles",function(data,status){
			 	
				if(status == "success"){
					var roles = data.roles;
					var str="<label>用户角色:</label>";
					for(i in roles){
						var role = roles[i];
						str += '<input id="'+type+'_role_box" flag="edit_input" roleid="'+role.id+'" type="checkbox">'+role.name+'</input>';
					}
					/*$("#edit_group_checkbox").empty();
					$("#edit_group_checkbox").append(str);*/
					$(boxid).empty();
					$(boxid).append(str);
					
					for(i in gids){
						$('#'+type+'_role_box[roleid="'+gids[i]+'"]').attr("checked",'true');
					}
					
				}
		 	});
		}
	
	function fillEditForm(userMap){
		var user = userMap.user;
		var gids = userMap.groupids;
		var rids = userMap.roleids;
		
		$("#edit_username").attr('value',user["username"]);
		$("#edit_password").attr('value',user["password"]);
		$("#edit_nickname").attr('value',user["nickname"]);
		$("#edit_email").attr('value',user["email"]);
		$("#edit_phone").attr('value',user["phone"]);
		/*$("#edit_status").attr('value',user["status"]);*/
		$("#edit_createDate").attr('value',user["createDate"]);
		if(user["status"] == "1"){
			$("#edit_select_on").attr('selected',"true");
		}else{
			$("#edit_select_off").attr('selected',"true");
		}
		$("#user_edit_form").attr('itemid',user["id"]);
		
		showGroupBox("#edit_user_group",gids,"edit");
		showRoleBox("#edit_user_role",rids,"edit");
	 	


	}
	
	
	function showUserTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_panel_table");
		//$("#table_btn").show();
		$("#table_btn").attr("item_type","user");
		$("#welecome_msg").hide();
		$("#table_title").text("用户列表");
		$("#table_msg").text("用户列表信息");
		addTableHead(['用户名','密码','昵称','邮箱','电话','状态','创建时间','编辑','删除']);
		var stru = "";
	 	$.get("../api/user/users",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.users){
					var u = data.users[d];
					u
		 			stru +=  additem(data.users[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
				
				//重新调整高度
				updateIFrame();
			}
		
	 	});
	 	
	};
	

	
	function userAdd(){
	       // 获取表单中的参数
		var params = $("#add_form").serialize();  
		var d = new Date();
		var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		//alert(date);
		 var gids=new Array(),i=0;
         $("#add_group_box:checked").each(function (index, domEle){
        	 //var t =  $(domEle);
        	gids[i++] = $(domEle).attr("groupid");
        });
         var rids=new Array();
         i=0
         $("#add_role_box:checked").each(function (index, domEle){
        	 //var t =  $(domEle);
        	rids[i++] = $(domEle).attr("roleid");
        });
         
        var user = { 
			'username': $("#add_username").val(), 
			'password': $("#add_password").val(), 
			'nickname': $("#add_nickname").val(), 
			'email': 	$("#add_email").val(), 
			'phone': 	$("#add_phone").val(), 
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
                	//$("#user_manage").trigger("click");
    				showUserTable();
    			 
    			}else{
    				alert("添加失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("添加失败！\nstatus:"+msg.status);
            }
         });
        
	};
	

	
	function userDelete(elemt){
    	var itemid = $(elemt).parent().parent().attr("itemid");
	 	$.get("../api/user/delete/"+itemid,function(data,status){
		 	
			if(status == "success" && data.flag == "success"){
				
				$("#listitem"+itemid).remove();
				//重新调整高度
				window.parent.iframeHeight();
			}else{
				alert("删除失败");
			}

	 	});
	
	};
	
	
	function userEditSubmit(){
        // 获取表单中的参数
		var userid =  $("#edit_form").attr('itemid');
		 var gids=new Array(),i=0;
         $("#edit_group_box:checked").each(function (index, domEle){
        	 //var t =  $(domEle);
        	gids[i++] = $(domEle).attr("groupid");
        });
         var rids=new Array();
         i=0
         $("#edit_role_box:checked").each(function (index, domEle){
        	 //var t =  $(domEle);
        	rids[i++] = $(domEle).attr("roleid");
        });
        var user = { 
			'id'	:	userid,
        	'username': $("#edit_username").val(), 
			'password': $("#edit_password").val(), 
			'nickname': $("#edit_nickname").val(), 
			'email': 	$("#edit_email").val(), 
			'phone': 	$("#edit_phone").val(), 
			'status': 	$("#edit_form_select").val(), 
			'createDate': $("#edit_createDate").val(),
			'groupIDs':	gids,
			'roleIDs':	rids
		}; 

         
        $.ajax({ 
            type:"POST", 
            url:"../api/user/update/"+userid, 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(user), 
            success:function(data,status){ 
    			if(status == "success" && data.flag == "success"){
                	//alert("用户添加成功！");
                	showUserTable();
    			}else{
    				alert("修改失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("修改失败！\nstatus:"+msg.status);
            }
         });

     
	}
	
	
	function showUserAdd(){
		showPanel("#div_user_add");	
		
		showGroupBox("#add_user_group",null,"add");
		showRoleBox("#add_user_role",null,"add");
		
    	//重新调整高度
    	window.parent.iframeHeight();
    	//updateIFrame();
	}
	
	function showUserEdit(itemid){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");

		//重新调整高度
		updateIFrame();
		
		//var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				$("#edit_form_title").text("用户编辑");
				$("#edit_form_submit").attr("value","提交");
				$("#edit_form").attr("form_type","edit");
				$("#edit_form").attr("itemid",itemid);
				
				fillEditForm(data);
				var formrow = $("#user_edit_form").children(".form_row").children("[flag]");
				formrow.attr("disabled",false);
				
				
			}
		
	 	});
	}
	
	function showUserDetail(itemid){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");
		//重新调整高度
		updateIFrame();
		
		//var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				
				$("#edit_form_title").text("用户详情");
				$("#edit_form_submit").attr("value","修改信息");
				$("#edit_form").attr("form_type","detail");
				$("#edit_form").attr("itemid",itemid);
				
				fillEditForm(data);
				
				var formrow = $("#edit_form").children(".form_row").children("[flag]");
				formrow.attr("disabled","disabled");
				
				
				
			}
		
	 	});
	}
	
