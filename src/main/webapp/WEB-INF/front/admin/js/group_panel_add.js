
function groupAddSubmit(){

	  
	 var group = { 
		'name': $("#input_name").val(), 
		'descr': $("#input_descr").val(), 
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/group/add", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(group), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='group_panel.html';
			 
			}else{
				alert("添加失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("添加失败！\nstatus:"+msg.status);
	     }
	  });
 
};

$(document).ready(function() {
	
	
	$("#form_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();
		groupAddSubmit();
	});	
	
});