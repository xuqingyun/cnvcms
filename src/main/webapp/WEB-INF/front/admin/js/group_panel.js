

function showGroupList(){
	
	showPanel("#list_panel");
	
    //初始化表格内容
    $('#dataTables-user').DataTable({
        responsive: true,
        "order": [[ 1, "asc" ]],
        //data : users,
        ajax : "../api/group/groups",
	 	columns: [
	 	    {"data": null},      
			{"data": "id"},
            {"data": "name"},
            {"data": "descr"},
            {"data": null},
            {"data": null}
        ],
		 "columnDefs": [{  
			"orderable" : false,
			"targets": -1,  
			"data": null,  
			defaultContent: '<a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times"></i> </a>',
		},
		{  
			"orderable" : false,
			"targets": -2,  
			"data": null,  
			defaultContent: '<a href="#" class="edit btn btn-default btn-xs"><i class="fa fa-edit"></i> </a>',
		},
		{  
			"orderable" : false,
			"targets": 0,  
			"data": null,  
			defaultContent: '<input type="checkbox" id="list_checkbox">', 
		}
		 ],
    
        "fnDrawCallback": function (oSettings) {

        	 updateIFrame();
        	 //window.parent.iframeHeight();
    	}
	});		
};

function showGroupEdit(itemid){
	//关闭所有面板，显示添加用户面板
	showPanel("#edit_panel");

	//重新调整高度
	updateIFrame();
	
	
 	$.get("../api/group/detail/"+itemid,function(data,status){
	 	
		if(status == "success"){
				
			var group = data.data;
			//ID放在username标签的itemid属性里
			$("#input_name").attr("itemid",itemid);
			$("#input_name").attr("value",group.name);
			$("#input_descr").attr("value",group.descr);
			
			//$("#input_members").attr("value",user.email);

			
/*			if(user.status == "1"){
				$("#status_select_on").attr('selected',"true");
			}else{
				$("#status_select_off").attr('selected',"true");
			}
	*/		
			$("#input_createDate").attr("value",user.createDate);
			
			showGroupBox('#div_groups_checkbox',data.groupids);
			showRoleBox('#div_roles_checkbox',data.roleids);
			
		}
	
 	});
}

function userDelete(ele){
    var table = $('#dataTables-user').DataTable();
    var row = $(ele).parents('tr');
    var cols = $(row).children();		
    var id = $(cols[0]).text();
    
 	$.get("../api/user/delete/"+id,function(data,status){
	 	
		if(status == "success" && data.flag == "success"){
			
			//$("#listitem"+itemid).remove();
			table.row(row).remove().draw();
			//重新调整高度
			updateIFrame();
		}else{
			alert("删除失败");
		}

 	});	
}

function userEditSubmit(){
    // 获取表单中的参数

	 var gids=new Array(),i=0;
	 $("#group_checkbox:checked").each(function (index, domEle){
		 gids[i++] = $(domEle).attr("groupid");
	 });
	  var rids=new Array();
	  i=0
	  $("#role_checkbox:checked").each(function (index, domEle){
		  rids[i++] = $(domEle).attr("roleid");
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
				changeIndexRightPanel('user_panel');
			 
			}else{
				alert("更新失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("更新失败！\najax错误,status:"+msg.status);
	     }
	  });
 
};
$(document).ready(function() {
	
	//初始化，默认显示用户列表
	showGroupList();
    
	//row 操作-edit 点击事件
    $('#dataTables-user tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
        var row = $(this).parents('tr');
        var cols = $(row).children();		
        var id = $(cols[1]).text();
        
        showGroupEdit(id);

    });
    
	$("#form_submit").on("click", function(event){
		//取消事件行为
		event.preventDefault();
		userEditSubmit();
	});
    
    //列表上方 添加用户按钮
    $('#btns_table #user_add').click(function(){
    	changeIndexRightPanel('user_add');
    });   	
    
 // 初始化刪除按钮
    $('#dataTables-user tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
     
        if (confirm("确定要删除该用户？")) {
          userDelete(this);
        }
     
    });

});	

