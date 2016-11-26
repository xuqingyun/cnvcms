$(document).ready(function () {
	//用户添加提交按钮
	$("#add_form_submit").click(function(){
		groupAdd();
	});

	//用户编辑提交按钮
	$("#edit_form_submit").live("click",function(){
		var groupid = $("#edit_form").attr('itemid');
		groupEditSubmit();
	
	});
	
	
	
	//列表编辑按钮响应
	$("#item_edit").live("click",function(){
		var itemid = $(this).parent().parent().attr("itemid");
		showGroupEdit(itemid);		
	});	

	//列表删除按钮响应
    $("#item_delete").live("click",function(){
    	groupDelete(this);
     	
	});
    
	//列表详情
    $("#item_detail").live("click",function(){
    	var itemid = $(this).parent().parent().attr("itemid");
    	showGroupEdit(itemid);    	
	});
    
  //Table编辑选中项按钮响应
    $("#user_table_selected").live("click",function(){	 	 	
	 	alert("table_selected in user");
	
	});
    
  //Table添加按钮响应
    $("#btn_table_add").live("click",function(){
    	showPanel("#div_group_add");	
    	//重新调整高度
    	window.parent.iframeHeight();
    	//updateIFrame();
	});

    
    showGroupTable();
    
});	 
	



	
	
	function showGroupTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_panel_table");
		$("#table_btn").show();
		$("#table_btn").attr("item_type","group");
		$("#welecome_msg").hide();
		$("#table_title").text("用户组列表");
		$("#table_msg").text("Group列表信息");
		addTableHead(['名称','描述','编辑','删除']);
		var stru = "";
	 	$.get("../api/group/groups",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.data){
		 			stru +=  additem(data.data[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
				
				//重新调整高度
				window.parent.iframeHeight();
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
 			showGroupTable();
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
	 	showGroupTable();
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
    				showGroupTable();
    			}else{
    				alert("更新失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("更新失败！\nstatus:"+msg.status);
            }
         });
	}
	
	
	function showGroupEdit(itemid){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_group_edit");

		window.parent.iframeHeight();
		//var itemid = $(elemt).parent().parent().attr("itemid");
		
	 	$.get("../api/group/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var item = data.group;
				$("#edit_groupname").attr('value',item["name"]);
				$("#edit_groupdescr").attr('value',item["descr"]);
		
				$("#edit_form").attr('itemid',item["id"]);
				
			}
		
	 	});
	 	$.get("../api/group/member/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var item = data.users;
				
				var str= '[<font color="red">'+item[0].name+'</font>]';
				for(i in item){
					if(i>0){
						//var user  = item[i];
						str += ',[<font color="red">'+item[i].name+'</font>]';
					}
				}
				$("#edit_group_member").empty();
				$("#edit_group_member").append(str);
				
			}
		
	 	});
	}

      
