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
	
	editor =$('#article-text').xheditor({
		tools:'full',
		skin:'default',
		showBlocktag:true,//显示段落标签
		//关闭html5上传，HTML5浏览器上传时文件不是multipart/form-data而是application/octet-stream
		html5Upload:false,
		//图片上传
		upImgUrl: getContextPath()+'/api/files/uploadImg/'+clientId,
		upImgExt: "jpg,jpeg,gif,png",
		//动画上传
		upFlashUrl:getContextPath()+'/api/files/uploadFlash/'+clientId,
		upFlashExt:"swf",
		//多媒体上传
		upMediaUrl:getContextPath()+'/api/files/uploadMedia/'+clientId,
		upMediaExt:"avi",
		//附件上传
		upLinkUrl:getContextPath()+'/api/files/uploadFile/'+clientId,
		upLinkExt:"zip,rar,txt",
		//文件上传成功回调函数
		onUpload: function(d){
			return true;
		}
	});

};
function getClientId(){
	var r = Math.floor(Math.random()*1000+1);
	var date = new Date();
	clientId = clientId + date.getHours() + date.getMinutes() + date.getSeconds()+date.getMilliseconds()+r;
};
var clientId = "";
var editor = null;
$(document).ready(function() {
	
	//每次打开页面 生成一个客户端id
	getClientId();
	//editorInit();

	//test
	$("#article-submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		//fileUpload();
	});
	
	//test
	$("#pic_btn").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		fileUpload();
	});
	
	
});