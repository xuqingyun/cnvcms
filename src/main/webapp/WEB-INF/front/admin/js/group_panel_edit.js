function showGroupEdit(itemid){

	if(itemid == null | itemid == ""){
		window.location.href = "group_panel.html"
	}	
	
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
 	initGroupMemberTable(itemid);
 	if(editTabInit){
 		
 	}else{
 		
 		editTabInit = true;
 	}
 	
 	
};

function userDeleteFromGroup(ele){
    //var table = $('#table-group-members').DataTable();
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
				//var table = $('#dataTables-list').DataTable();
				//table.ajax.reload( null, false );
				window.location.href = "group_panel.html"
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
    table = $('#table-group-members').DataTable({
        //responsive: true,
        //"order": [[ 0, "asc" ]],
        "ordering": false,
        "paging": false,
        "searching": false,
        "scrollX": true,
        "autoWidth": false,
        "info": false,
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
    

	});		
}


var editTabInit = false;
var table;
$(document).ready(function() {
	

	
	showGroupEdit(getUrlParam("id"));
	
    $('#table-group-members tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
        if (confirm("确定要将该用户从组中移除？")) {
          userDeleteFromGroup(this);
        }
     
    });
    
	$("#form_submit").on("click", function(event){
		//取消事件行为
		event.preventDefault();
		groupEditSubmit();
	});
});
