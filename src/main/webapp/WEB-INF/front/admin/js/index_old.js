/*
var $ = jQuery.noConflict();
$(function() {
	$('#tabsmenu').tabify();
	$(".toggle_container").hide(); 
	$(".trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false;
	});
});
*/
$(document).ready(function () {
	//验证是否登录,否则跳转到登录页面
 	$.get("../api/admin/login.check",function(data,status){
		if(status != "success" || data.login != "success"){
			window.location.href="login.html"; 
		}
 	});

	//showUserTable();
	//$("#user_manage").trigger("click");
	$(".center_panel").hide();
	$("#div_table_and_btn").show();
	$("#table_btn").hide();
	
	//UserManage事件响应
	$("#user_manage").click(function(){
		showUserTable();
	});
	
	//GroupManage事件响应
	$("#group_manage").click(function(){
		showGroupTable();
	});
	
	//RoleManage事件响应
	$("#role_manage").click(function(){
		showRoleTable();
	});
	
	//用户添加事件响应
	$("#user_add").click(function(){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_add");
	});
	

	//用户添加提交按钮
	$("#user_add_form_submit").click(function(){
		userAdd();
	});

	//用户编辑提交按钮
	$("#user_edit_form_submit").click(function(){
		
		var item_type = $("#user_edit_form").attr("form_type");
		if(item_type == "edit"){
			userEditSubmit(this);
		}else if(item_type == "detail"){
			showUserEdit(this);	
		}
		
		
        
	});
	
	//Group添加提交按钮
	$("#group_add_form_submit").click(function(){
		groupAdd();
	});
	
	//Group编辑提交按钮
	$("#group_edit_form_submit").click(function(){
		groupEditSubmit(this);     
	});
	
	
	//列表编辑按钮响应
	$("#item_edit").live("click",function(){
		var item_type = $("#table_btn").attr("item_type");
		if(item_type == "user"){
			showUserEdit(this);	
		}else if(item_type == "group"){
			showGroupEdit(this);	
		}
		
	});	

	//列表删除按钮响应
    $("#item_delete").live("click",function(){
		var item_type = $("#table_btn").attr("item_type");
		if(item_type == "user"){
			userDelete(this);
		}else if(item_type == "group"){
			groupDelete(this);
		}
    	
	});
    
	//列表详情
    $("#item_detail").live("click",function(){
		var item_type = $("#table_btn").attr("item_type");
		if(item_type == "user"){
			showUserDetail(this);
		}else if(item_type == "group"){
			showGroupDetail(this);
		}
    	
	});
    
  //Table编辑选中项按钮响应
    $("#table_selected").live("click",function(){	 	 	
	 	alert("table_selected");
	
	});
    
  //Table添加按钮响应
    $("#table_add").live("click",function(){	 	 	
	 	var item_type = $("#table_btn").attr("item_type");
	 	if(item_type == "user"){
	 		//$("#user_add").trigger("click");
	 		showPanel("#div_user_add");
	 	}else if(item_type == "group"){
	 		//$("#user_add").trigger("click");
	 		showPanel("#div_group_add");
	 	}
	
	});

   

	function additem(item){
		var str = '<tr itemid="'+item["id"]+'" id="listitem'+item["id"]+'" class="odd">';
		for(var s in item){
			if(s=="id"){
				str += '<td><input type="checkbox" name="" /></td>';
				//str +='" class="odd"><td><input type="checkbox" name="" /></td>';
			}else if(s=="name" | s=="username"){
				str += '<td><span id="item_detail" ><a href="#">'+item[s]+'</a></span></td>';
			}else{
				str += '<td>'+item[s]+'</td>';
			}				
		}
		str += '<td><span id="item_edit" > \
					<a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a> \
				</span ></td> \
				<td><span id="item_delete" > \
					<a href="#"><img src="images/trash.gif" alt="" title="" border="0"/></a> \
				</span ></td> \
				</tr>';
		return str;
	}
	
	function addTableHead(headlist){
		var str = "<th></th> ";
		for(var s in headlist){
			str +="<th>"+headlist[s]+"</th>";
		}
		$("#table_head").empty();
		$("#table_head").append(str);
 	
	};
	
	function showPanel(panel){
		$(".center_panel").hide();
		$(panel).show();
	};
	
	
	function showUserTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_table_and_btn");
		$("#table_btn").show();
		$("#table_btn").attr("item_type","user");
		$("#welecome_msg").hide();
		$("#table_title").text("用户列表");
		$("#table_msg").text("用户列表信息");
		addTableHead(['用户名','密码','昵称','邮箱','电话','状态','创建时间','编辑','删除']);
		var stru = "";
	 	$.get("../api/user/users",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.users){
		 			stru +=  additem(data.users[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
			}
		
	 	});
	};
	
	function showGroupTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_table_and_btn");
		$("#table_btn").show();
		$("#table_btn").attr("item_type","group");
		$("#welecome_msg").hide();
		$("#table_title").text("用户组列表");
		$("#table_msg").text("Group列表信息");
		addTableHead(['名称','描述','编辑','删除']);
		var stru = "";
	 	$.get("../api/group/groups",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.groups){
		 			stru +=  additem(data.groups[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
			}
		
	 	});
	};
	
	function showRoleTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_table_and_btn");
		$("#table_btn").show();
		$("#table_btn").attr("item_type","role");
		$("#welecome_msg").hide();
		$("#table_title").text("用户角色列表");
		$("#table_msg").text("Role列表信息");
		addTableHead(['角色名称','角色类型','角色','编辑','删除']);
		var stru = "";
	 	$.get("../api/role/roles",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.roles){
		 			stru +=  additem(data.roles[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
			}
		
	 	});
	};
	
	function userAdd(){
	       // 获取表单中的参数
		var params = $("#add_form").serialize();  
		var d = new Date();
		var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		//alert(date);
		
        var user = { 
			'username': $("#add_username").val(), 
			'password': $("#add_password").val(), 
			'nickname': $("#add_nickname").val(), 
			'email': 	$("#add_email").val(), 
			'phone': 	$("#add_phone").val(), 
			'status': 	"1", 
			'createDate': date
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
                	$("#user_manage").trigger("click");
    			}else{
    				alert("添加失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("添加失败！\nstatus:"+msg.status);
            }
         });
        
	};
	
	
	function groupAdd(){

     var dataForm = { 
			'name': $("#add_groupname").val(), 
			'descr': $("#add_groupdescr").val(), 
		}; 
     
     $.ajax({ 
         type:"POST", 
         url:"../api/group/add", 
         dataType:"json",      
         contentType:"application/json",               
         data:JSON.stringify(dataForm), 
         success:function(data,status){ 
 			if(status == "success" && data.flag == "success"){
             	//alert("用户添加成功！");
             	$("#group_manage").trigger("click");
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
			}else{
				alert("删除失败");
			}

	 	});
	
	};
	
	function groupDelete(elemt){
    	var itemid = $(elemt).parent().parent().attr("itemid");
	 	$.get("../api/group/delete/"+itemid,function(data,status){
		 	
			if(status == "success" && data.flag == "success"){
				$("#listitem"+itemid).remove();
			}else{
				alert("删除失败");
			}

	 	});
	
	};
	
	function userEditSubmit(elemt){
        // 获取表单中的参数
		var userid =  $(elemt).parent().parent().attr('itemid');
		 var gids=new Array(),i=0;
         $("#edit_group_box:checked").each(function (index, domEle){
        	 //var t =  $(domEle);
        	gids[i++] = $(domEle).attr("groupid");
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
			'roleIDs':	[1,2]
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
                	$("#user_manage").trigger("click");
    			}else{
    				alert("修改失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("修改失败！\nstatus:"+msg.status);
            }
         });

     
	}
	
	
	function groupEditSubmit(elemt){
        // 获取表单中的参数
		var groupid =  $(elemt).parent().parent().attr('itemid');
        var group = { 
			'id'	:	groupid,
        	'name': $("#edit_groupname").val(), 
			'descr': $("#edit_groupdescr").val(), 
		}; 
       
        $.ajax({ 
            type:"POST", 
            url:"../api/group/update", 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(group), 
            success:function(data,status){ 
    			if(status == "success" && data.flag == "success"){
                	//alert("用户添加成功！");
                	$("#group_manage").trigger("click");
    			}else{
    				alert("更新失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("更新失败！\nstatus:"+msg.status);
            }
         });
	}
	
	function fillEditForm(userMap){
		var user = userMap.user;
		var gids = userMap.groupids;
		
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
	 	$.get("../api/group/groups",function(data,status){
		 	
			if(status == "success"){
				var groups = data.groups;
				var str="<label>用户组别:</label>";
				for(i in groups){
					var group = groups[i];
					str += '<input id="edit_group_box" flag="edit_input" groupid="'+group.id+'" type="checkbox">'+group.name+'</input>';
					
				}
				/*$("#edit_group_checkbox").empty();
				$("#edit_group_checkbox").append(str);*/
				$("#edit_user_group").empty();
				$("#edit_user_group").append(str);
				for(i in gids){
					$("#edit_group_box[groupid='"+gids[i]+"']").attr("checked",'true');
				}
			}
	 	});
	 	
	}
	
	function showUserEdit(elemt){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");

		
		var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				$("#edit_form_title").text("用户编辑");
				$("#user_edit_form_submit").attr("value","提交");
				$("#user_edit_form").attr("form_type","edit");
				
				fillEditForm(data);
				var formrow = $("#user_edit_form").children(".form_row").children("[flag]");
				formrow.attr("disabled",false);
			}
		
	 	});
	}
	
	function showUserDetail(elemt){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");

		
		var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				
				$("#edit_form_title").text("用户详情");
				$("#user_edit_form_submit").attr("value","修改信息");
				$("#user_edit_form").attr("form_type","detail");
				fillEditForm(data);
				
				var formrow = $("#user_edit_form").children(".form_row").children("[flag]");
				formrow.attr("disabled","disabled");
			}
		
	 	});
	}
	function showGroupEdit(elemt){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_group_edit");

		
		var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/group/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var item = data.group;
				$("#edit_groupname").attr('value',item["name"]);
				$("#edit_groupdescr").attr('value',item["descr"]);
		
				$("#group_edit_form").attr('itemid',item["id"]);
				
			}
		
	 	});
	}
	
   

});