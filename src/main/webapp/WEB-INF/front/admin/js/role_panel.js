

function showRoleList(){
	
	
    //初始化表格内容
    table = $('#dataTables-list').DataTable({
        //responsive: true,
        "order": [[ 1, "asc" ]],
        "scrollX": true,
        "stateSave" : true,
        //data : users,
        ajax : "../api/role/roles",
	 	columns: [
	 	    {"data": null},      
			{"data": "id"},
            {"data": "name"},
            {"data": "role_type"},
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
    
/*        "fnDrawCallback": function (oSettings) {

        	 updateIFrame();
        	 //window.parent.iframeHeight();
    	}*/
	});		
};


function roleDelete(ele){
    //var table = $('#dataTables-list').DataTable();
    var row = $(ele).parents('tr');
    var rowdata= table.row(row).data();
    var id = rowdata.id;
    
 	$.get("../api/role/delete/"+id,function(data,status){
	 	
		if(status == "success" && data.flag == "success"){
			
			//table.row(row).remove().draw();
			window.location.href = "role_panel.html";
		}else{
			alert("删除失败");
		}

 	});	
}



var table;
$(document).ready(function() {
	
	
	//初始化，默认显示用户列表
	showRoleList();
    
	//row 操作-edit 点击事件
    $('#dataTables-list tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
    	//var table = $('#dataTables-list').DataTable();
        var row = $(this).parents('tr');        
        var rowdata= table.row(row).data();
        var id = rowdata.id;
        alert("功能开发中...");
       // window.location.href = "role_panel_edit.html?id="+id;

    });
    

    
    //列表上方 添加用户按钮
    $('#btns_table #role_add').click(function(){
    	alert("功能开发中...");
    	//window.location.href = "role_panel_add.html";
    });  
    
    //列表上方 删除所选按钮
    $('#delete_select').click( function () {
    	alert("功能开发中...");
    	roleSelectedDelete();	
    });
    
 // 初始化刪除按钮
    $('#dataTables-list tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
        alert("功能开发中...");
        if (confirm("确定要删除该用户角色？")) {
        	
        	//roleDelete(this);
        }
     
    });
    


    
    //行点击响应
    $('#dataTables-list tbody').on( 'click', 'tr', function () {
    	 //var table = $('#dataTables-user').DataTable();
    	 var trs= $(this).find("input");
    	 var checkpre  = $(trs).attr('checked');
    	 if(checkpre == "checked"){
    		 $(trs).attr('checked',false);
    	 }else{
    		 $(trs).attr('checked',true);
    	 }
    	 
    } );
 
    // 全选按钮
    var listCheckboxsStatus = new Boolean('true');
    $('#select_all').click( function (e) {
        e.preventDefault();
        //var table = $('#dataTables-user').DataTable();
        var listcheckboxs = $('tbody #list_checkbox');
        
        
        listcheckboxs.attr('checked',listCheckboxsStatus);
        listCheckboxsStatus = !listCheckboxsStatus;
        	
    });    
});	

