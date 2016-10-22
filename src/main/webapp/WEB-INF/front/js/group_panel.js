

$(document).ready(function () {
	
	//showUserTable();
	//$("#user_manage").trigger("click");
	function initGroupPanel(){
		$(".center_panel").hide();
		//$("#div_table_and_btn").show();
		//$("#table_btn").hide();
		showGroupTable();
	}




	
	
	//Group添加提交按钮
	$("#group_add_form_submit").click(function(){
		groupAdd();
	});
	
	//Group编辑提交按钮
	$("#group_edit_form_submit").click(function(){
		groupEditSubmit();     
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
    
  //Table多选按钮响应
    $("#table_selected").live("click",function(){	 	 	
	 	alert("table_selected in group");
	
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
	

	
	function groupEditSubmit(){
        // 获取表单中的参数
		var groupid = $("#edit_form").attr('itemid');
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
	
	
	function showGroupEdit(elemt){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_group_edit");

		
		var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/group/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var item = data.group;
				$("#edit_groupname").attr('value',item["name"]);
				$("#edit_groupdescr").attr('value',item["descr"]);
		
				$("#edit_form").attr('itemid',item["id"]);
				
			}
		
	 	});
	}

      

});