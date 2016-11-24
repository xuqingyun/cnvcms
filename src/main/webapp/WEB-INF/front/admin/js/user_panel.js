

function userDelete(id){
	//var itemid = $(elemt).parent().parent().attr("itemid");
 	$.get("../api/user/delete/"+id,function(data,status){
	 	
		if(status == "success" && data.flag == "success"){
			
			$("#listitem"+itemid).remove();
			//重新调整高度
			updateIFrame();
		}else{
			alert("删除失败");
		}

 	});

};

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

$(document).ready(function() {
    	
    	
        $('#dataTables-user').DataTable({
            responsive: true,
            //data : users,
            ajax : "../api/user/users",
		 	columns: [
				{"data": "id"},
                {"data": "username"},
                {"data": "password"},
                {"data": "nickname"},
                {"data": "email"},
                {"data": "phone"},
                {"data": "status"},
                {"data": "createDate"},
                {"data": null}
            ],
			 "columnDefs": [{  
				// 定义操作列  
				"targets": -1,  
				"data": null,  
				defaultContent: '<a href="#" class="edit btn btn-default btn-xs"><i class="fa fa-edit">编辑</i> </a>' +
							   ' <a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times">删除</i> </a>',
			 
			}],
        
	        "fnDrawCallback": function (oSettings) {
	
	        	 updateIFrame();
	        	 //window.parent.iframeHeight();
	    	}
		});	
     
        updateIFrame();
        
        
     // 初始化刪除按钮
        $('#dataTables-user tbody').on('click', 'a.delete', function(e) {
            e.preventDefault();
         
            if (confirm("确定要删除该用户？")) {
                var table = $('#dataTables-user').DataTable();
                var row = $(this).parents('tr');
                var cols = $(row).children();		
                var id = $(cols[0]).text();
                
             	$.get("../api/user/delete/"+id,function(data,status){
            	 	
            		if(status == "success" && data.flag == "success"){
            			
            			//$("#listitem"+itemid).remove();
            			table.row(row).remove().draw();
            			//重新调整高度
            			window.parent.iframeHeight();
            		}else{
            			alert("删除失败");
            		}

             	});
               
            }
         
        });
    });	

