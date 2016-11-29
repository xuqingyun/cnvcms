

function showUserList(){
	
	//showPanel("#list_panel");

    //初始化表格内容
    $('#dataTables-user').DataTable({
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

function showUserEdit(itemid){
	//关闭所有面板，显示添加用户面板
	showPanel("#edit_panel");

	//重新调整高度
	updateIFrame();
	
	
 	$.get("../api/user/detail/"+itemid,function(data,status){
	 	
		if(status == "success"){
				
			var user = data.user;
			//ID放在username标签的itemid属性里
			$("#input_username").attr("itemid",itemid);
			$("#input_username").attr("value",user.username);
			$("#input_nickname").attr("value",user.nickname);
			$("#input_email").attr("value",user.email);
			$("#input_phone").attr("value",user.phone);
			$("#input_status").val(user.status);
				
			$("#input_createDate").attr("value",user.createDate);
			
			showGroupBox('#div_groups_checkbox',data.groupids);
			showRoleBox('#div_roles_checkbox',data.roleids);
			
		}
	
 	});
}

function userDelete(ele){
    var table = $('#dataTables-user').DataTable();
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
	
	var table = $('#dataTables-user').DataTable();
	
	var userids = new Array();
   	 $("#list_checkbox:checked").each(function (index, domEle){
		$(domEle).attr("groupid");
        var row = $(domEle).parents('tr');        
        var rowdata= table.row(row).data();
        userids[index] = rowdata.id;
	 });
   	
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

function userEditSubmit(){
    // 获取表单中的参数
	var table = $('#dataTables-user').DataTable();
	
	 var gids=new Array();
	 $("#group_checkbox:checked").each(function (index, domEle){
		 gids[index] = $(domEle).attr("groupid");
	 });
	  var rids=new Array();
	  $("#role_checkbox:checked").each(function (index, domEle){
		  rids[index] = $(domEle).attr("roleid");
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

$(document).ready(function() {
	
	
	//初始化，默认显示用户列表
	showUserList();
    
	//row 操作-edit 点击事件
    $('#dataTables-user tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
    	var table = $('#dataTables-user').DataTable();
        var row = $(this).parents('tr');        
        var rowdata= table.row(row).data();
        var id = rowdata.id;
        
        showUserEdit(id);

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
    	 var table = $('#dataTables-user').DataTable();
    	 var trs= $(this).find("input");
    } );
 
    // 全选按钮
    var listCheckboxsStatus = new Boolean('false');
    $('#dataTables-user thead').on('click', 'a.btn', function(e) {
        e.preventDefault();
        var table = $('#dataTables-user').DataTable();
        var listcheckboxs = $('tbody #list_checkbox');
        var checkpre  = listcheckboxs.attr('checked');
        listCheckboxsStatus = !listCheckboxsStatus;
        listcheckboxs.attr('checked',listCheckboxsStatus);
        	
    });
    
});	

