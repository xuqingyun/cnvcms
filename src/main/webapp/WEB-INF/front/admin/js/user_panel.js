$(document).ready(function() {
    	
    	
        $('#dataTables-example').DataTable({
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
				defaultContent: '<a href="#" class="edit btn btn-default btn-xs"><i class="fa fa-edit"></i> 编辑</a>' +
								' <a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times"></i> 删除</a>',
			 
			}],
        
	        "fnDrawCallback": function (oSettings) {
	
	        	 updateIFrame();
	       	
	    	}
		});	
     
        updateIFrame();
    });	