function fileUpload(){
	var formData = new FormData();
	var name = $("#user_pic").val();
	var ufile=document.getElementById("user_pic");
	formData.append("file",ufile.files[0]);
	formData.append("name",name);
	$.ajax({ 
		url : getContextPath()+'/api/files/upload', 
		type : 'POST', 
		data : formData, 
		// 告诉jQuery不要去处理发送的数据
		processData : false, 
		// 告诉jQuery不要去设置Content-Type请求头
		contentType : false,
		/*beforeSend:function(){
			console.log("正在进行，请稍候");
		},*/
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
	
  
};

function editorInit(){
	$('#article-text').xheditor({
		tools:'full',
		skin:'default',
		showBlocktag:true,
		//internalScript:false,
		//internalStyle:false,
		//width:300,height:200,
		//loadCSS:'http://xheditor.com/test.css',
		//fullscreen:true,
		//sourceMode:true,
		//forcePtag:true,
		upImgUrl:"upload.php",
		upImgExt:"jpg,jpeg,gif,png",
		onUpload: function(){}
	});

};

$(document).ready(function() {
		
	//test
	$("#pic_btn").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		fileUpload();

	});
	
	
});