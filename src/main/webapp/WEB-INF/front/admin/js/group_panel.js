
var editTabInit = false;

function showGroupList(){
	
	showPanel("#list_panel");
	
    //初始化表格内容
    $('#dataTables-list').DataTable({
        //responsive: true,
        "order": [[ 1, "asc" ]],
        "scrollX": true,
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
			$("#input_descr").text(group.descr);
			//$("#input_descr").attr("value",group.descr);
		}
	
 	});
 	if(editTabInit){
 		
 	}else{
 		initGroupMemberTable(itemid);
 		editTabInit = true;
 	}
 	
 	
}

function userDelete(ele){
    var table = $('#dataTables-list').DataTable();
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

function userDeleteFromGroup(ele){
    var table = $('#table-group-members').DataTable();
    var row = table.row($(ele).parents('tr'));	
    var userid = row.data()["id"];
    var datasent = {
    		"userid"  : userid,
    		"groupid" : $("#input_name").attr("itemid"),
    };
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/group/removeUser/", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(datasent), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				row.remove().draw(false);
			}else{
				alert("更新失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("更新失败！\najax错误,status:"+msg.status);
	     }
	  });
}

function groupEditSubmit(){
    // 获取表单中的参数

	 var group = { 
		'id': $("#input_name").attr("itemid"), 
		'name': $("#input_name").val(), 
		'descr': $("#input_descr").val()
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/group/update/", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(group), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				var table = $('#dataTables-list').DataTable();
				table.ajax.reload( null, false );
				showPanel("#list_panel");
			}else{
				alert("更新失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("更新失败！\najax错误,status:"+msg.status);
	     }
	  });
 
};

function initGroupMemberTable(itemid){
    $('#table-group-members').DataTable({
        //responsive: true,
        //"order": [[ 0, "asc" ]],
        "ordering": false,
        "paging": false,
        "searching": false,
        "scrollX": true,
        "autoWidth": false,
        //data : users,
        ajax : "../api/group/member/"+itemid,
	 	columns: [
			{"data": "id"},
            {"data": "username"},
            {"data": "nickname"},
            {"data": "email"},
            {"data": "phone"},
            {"data": null}
        ],
		 "columnDefs": [{  
			"orderable" : false,
			"targets": -1,  
			"data": null,  
			defaultContent: '<a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times"></i> </a>',
		}
		 ],
    
        "fnDrawCallback": function (oSettings) {
        	 updateIFrame();
    	}
	});		
}

$(document).ready(function() {
	
	
	
	
	//初始化，默认显示用户列表
	showGroupList();
    
	//row 操作-edit 点击事件
    $('#dataTables-list tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
    	var table = $('#dataTables-list').DataTable();
        var row = $(this).parents('tr');        
        var rowdata= table.row(row).data();
        var id = rowdata.id;
        
        showGroupEdit(id);

    });
    
	$("#form_submit").on("click", function(event){
		//取消事件行为
		event.preventDefault();
		groupEditSubmit();
	});
    
    //列表上方 添加用户按钮
    $('#btns_table #group_add').click(function(){
    	changeIndexRightPanel('group_add');
    });   	
    
 // 初始化刪除按钮
    $('#dataTables-list tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
        if (confirm("确定要删除该用户？")) {
          groupDelete(this);
        }
     
    });
    $('#table-group-members tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
        if (confirm("确定要将该用户从组中移除？")) {
          userDeleteFromGroup(this);
        }
     
    });

    // 全选按钮
    var listCheckboxsStatus = new Boolean('false');
    $('#dataTables-list thead').on('click', 'a.btn', function(e) {
        e.preventDefault();
        var table = $('#dataTables-list').DataTable();
        var listcheckboxs = $('#dataTables-list tbody #list_checkbox');
        var checkpre  = listcheckboxs.attr('checked');
        listCheckboxsStatus = !listCheckboxsStatus;
        listcheckboxs.attr('checked',listCheckboxsStatus);
        	
    });
});	

