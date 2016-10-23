$(document).ready(function () {
	//用户添加提交按钮
	$("#add_form_submit").click(function(){
		userAdd();
	});

	//用户编辑提交按钮
	$("#edit_form_submit").click(function(){
		userEditSubmit();
        
	});
	
	
	
	//列表编辑按钮响应
	$("#user_item_edit").live("click",function(){
		showUserEdit(this);	
	});	

	//列表删除按钮响应
    $("#user_item_delete").live("click",function(){
    	userDelete(this);
	});
    
  //Table编辑选中项按钮响应
    $("#user_table_selected").live("click",function(){	 	 	
	 	alert("table_selected in user");
	
	});
    
  //Table添加按钮响应
    $("#user_table_add").live("click",function(){
    	//showUserTable();
    	showPanel("#div_user_add");	
	});

    $("#user_table_list").live("click",function(){
    	showUserTable();
	});
    
    showUserTable();
    $(".div_user_add").hide();
    $(".div_user_edit").hide();
    
});	 

    function initUserPanel(){
    	showUserTable();
    	//$("#user_table_list").trigger("click");
    }
    
	function additem(item){
		var str = '<tr itemid="'+item["id"]+'" id="listitem'+item["id"]+'" class="odd">';
		for(var s in item){
			if(s=="id"){
				str += '<td><input type="checkbox" name="" /></td>';
				//str +='" class="odd"><td><input type="checkbox" name="" /></td>';
			}else{
				str += '<td>'+item[s]+'</td>';
			}				
		}
		str += '<td><span id="user_item_edit" > \
					<a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a> \
				</span ></td> \
				<td><span id="user_item_delete" > \
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
		var t = $(panel);
		$(".center_panel").hide();
		$(panel).show();
	};
	
	function showUserTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_user_table");
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
		 			stru +=  additem(data.users[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
				var t =window.parent;
				window.parent.iframeHeight();
				//window.parent.document.getElementById('right_panel_iframe').contentWindow.location.reload(true);
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
            url:"api/user/add", 
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
	
	
	function userEditSubmit(){
        // 获取表单中的参数
		var userid = $("#edit_form").attr('itemid');
        var user = { 
			'id'	:	userid,
        	'username': $("#edit_username").val(), 
			'password': $("#edit_password").val(), 
			'nickname': $("#edit_nickname").val(), 
			'email': 	$("#edit_email").val(), 
			'phone': 	$("#edit_phone").val(), 
			'status': 	$("#edit_form_select").val(), 
			'createDate': $("#edit_createDate").val()
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
	
	

	
	function showUserEdit(elemt){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");

		
		var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var user = data.user;
				$("#edit_username").attr('value',user["username"]);
				$("#edit_password").attr('value',user["password"]);
				$("#edit_nickname").attr('value',user["nickname"]);
				$("#edit_email").attr('value',user["email"]);
				$("#edit_phone").attr('value',user["phone"]);
				$("#edit_status").attr('value',user["status"]);
				$("#edit_createDate").attr('value',user["createDate"]);
				if(user["status"] == "1"){
					$("#edit_select_on").attr('selected',"true");
				}else{
					$("#edit_select_off").attr('selected',"true");
				}
				$("#edit_form").attr('itemid',user["id"]);
				
			}
		
	 	});
	 	
	}
	    