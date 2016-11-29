

function showUserList(){
	
	//showPanel("#list_panel");

    //初始化表格内容
	table = $('#dataTables-user').DataTable({
        //responsive: true,
    	"scrollX": true,
        "order": [[ 1, "asc" ]],
        ajax : "../api/user/users",
	 	columns: [
	 	    {"data": null},
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
			"orderable" : false,
			"targets": -1,  
			"data": null,  
			defaultContent: '<a href="#" class="edit btn btn-default btn-xs"><i class="fa fa-edit">编辑</i> </a>' +
						   ' <a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times">删除</i> </a>',
		 
		},
		{  
			// 定义操作列  
			"targets": 0, 
			"orderable" : false,
			"data": null,  
			defaultContent: '<input type="checkbox" id="list_checkbox">', 
		}],
    

	});		
};


function userDelete(ele){
//    var table = $('#dataTables-user').DataTable();
    var row = $(ele).parents('tr');
    var rowdata= table.row(row).data();
    var id = rowdata.id;
    
    
 	$.get("../api/user/delete/"+id,function(data,status){
	 	
		if(status == "success" && data.flag == "success"){
			table.row(row).remove().draw( false );;
			//重新调整高度
			//updateIFrame();
		}else{
			alert("删除失败");
		}

 	});	
}

function userSelectedDelete(){
	
	//var table = $('#dataTables-user').DataTable();
	
	var userids = new Array();
   	 $("#list_checkbox:checked").each(function (index, domEle){
		$(domEle).attr("groupid");
        var row = $(domEle).parents('tr');        
        var rowdata= table.row(row).data();
        userids[index] = rowdata.id;
	 });
   	 if(userids.length ==0){
   		 return;
   	 }
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/user/deleteIds/", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(userids), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//changeIndexRightPanel('user_panel');
				table.ajax.reload(null,false);
			}else{
				alert("删除失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("删除失败！\najax错误,status:"+msg.status);
	     }
	  });	
}

var table;
$(document).ready(function() {
	
	//loadNav();
	//loadNav();
	loadNavigation();
	loadNavigation();
	
	//初始化，默认显示用户列表
	showUserList();
    
	//table = $('#dataTables-user').DataTable();
	
	//row 操作-edit 点击事件
    $('#dataTables-user tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
    	//var table = $('#dataTables-user').DataTable();
        var row = $(this).parents('tr');        
        var rowdata= table.row(row).data();
        var id = rowdata.id;
        
        //showUserEdit(id);
        window.location.href='user_panel_edit.html?id='+id;

    });
    
    
    //列表上方 添加用户按钮
    $('#btns_table #user_add').click(function(){
    	window.location.href='user_panel_add.html';
    });   
    
    //列表上方 删除所选按钮
    $('#delete_select').click( function () {
    	userSelectedDelete();	
    }); 
    
 // 初始化刪除按钮
    $('#dataTables-user tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
     
        if (confirm("确定要删除该用户？")) {
          userDelete(this);
        }
     
    });

    //行点击响应
    $('#dataTables-user tbody').on( 'click', 'tr', function () {
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

