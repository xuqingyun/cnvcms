
function showUserAdd(){
	showGroupBox("#div_groups_checkbox",null);
	showRoleBox("#div_roles_checkbox",null);
};
function userAdd(){
    // 获取表单中的参数
	var d = new Date();
	var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	//alert(date);
	 var gids=new Array(),i=0;
	 $("#group_checkbox:checked").each(function (index, domEle){
		 //var t =  $(domEle);
		 gids[i++] = $(domEle).attr("groupid");
	 });
	  var rids=new Array();
	  i=0
	  $("#role_checkbox:checked").each(function (index, domEle){
		  //var t =  $(domEle);
		  rids[i++] = $(domEle).attr("roleid");
	 });
	  
	 var user = { 
		'username': $("#input_username").val(), 
		'password': $("#input_password").val(), 
		'nickname': $("#input_nickname").val(), 
		'email': 	$("#input_email").val(), 
		'phone': 	$("#input_phone").val(), 
		'status': 	"1", 
		'createDate': date,
		'groupIDs':	gids,
		'roleIDs':	rids
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/user/add", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(user), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='user_panel.html';
			 
			}else{
				alert("添加失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("添加失败！\nstatus:"+msg.status);
	     }
	  });
 
};
function fileUpload(){
	var formData = new FormData();
	var name = $("#user_pic").val();
	var ufile=document.getElementById("user_pic");
	formData.append("file",ufile.files[0]);
	formData.append("name",name);
	$.ajax({ 
		url : '../api/files/upload', 
		type : 'POST', 
		data : formData, 
		// 告诉jQuery不要去处理发送的数据
		processData : false, 
		// 告诉jQuery不要去设置Content-Type请求头
		contentType : false,
		beforeSend:function(){
			console.log("正在进行，请稍候");
		},
		success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				alert("上传成功！");
				 //window.location.href='user_panel.html';
			 
			}else{
				alert("上传失败!\n"+data.flag);
			}
	
	     }, 
		error : function(msg) { 
			console.log("error");
		} 
	});	
	

/*        $("#uploadForm").ajaxSubmit({
            success: function (data) {
                alert("成功");
            },
            error: function (error) { alert(error); },
            url: '/Default1/UploadFilesPost', 设置post提交到的页面
            type: "post", 设置表单以post方法提交
            dataType: "json" 设置返回值类型为文本
        });*/
  
};

$(document).ready(function() {
	
	showUserAdd();
	
	$("#form_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();

		
		userAdd();
		//ftest();
	});
	
	//test
	$("#pic_btn").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		fileUpload();

	});
	
});