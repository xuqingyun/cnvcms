function fileUpload(){
	var formData = new FormData();
	var name = $("#user_pic").val();
	var ufile=document.getElementById("user_pic");
	formData.append("file",ufile.files[0]);
	formData.append("name",name);
	$.ajax({ 
		url : getContextPath()+'/api/files/uploadFile', 
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
			var m = d[0].url;
			fileIds[d[0].url] = d[0].id;
			//var temp= JSON.stringify(fileIds);
			//setCookie("fileIds",fileIds);
		}
	});

};
function articleSubmit(){
	var d = new Date();
	var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

	var content = editor.getSource();
	var attchids = new Array();
	
	
	$("#temp-text").html(content);
	var imgs = $("#temp-text").find("img");
	for(var i=0 ;i<imgs.length;i++){
		var imgid = imgs[i];
		var src = $(imgid).attr("src");
		var picid = fileIds[src];
		//如果是上传的图片
		if(picid!=null){
			//将id加入到附件列表
			attchids[attchids.length] = picid;
			//设置img标签的id属性
			$(imgid).attr("imgid",picid);
		}
	}
	content = $("#temp-text").html();
	
	
/*	var picUrl = getUrl(/<img.*?src=\".*?\"/gi,content);
	for(i in picUrl){
		pu = fileIds[picUrl[i]];
		if(pu != null)
			attchids[attchids.length] = pu;
	}*/
	
	
	//attchids=[7,8];
	var article = {
		"title":$("#input_title").val(),
		"summary":$("#article-summary").val(),
		"content":content,
		"keywords":$("#input_keywords").val(),
		"userId":26,
		"channelId":14,
		"status":$("#input_status").val(),
		"recommend":$("#input_recommend").val(),
		"chiefPic":1,
		"attachs":attchids
	}
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/article/add/"+clientId, 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(article), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='home.html';
			 
			}else{
				alert("添加失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("添加失败！\nstatus:"+msg.status);
	     }
	  });
}
function getUrl(reg,str){
	var x = new Array();
	while(t = reg.exec(str)){
		t = t[0].replace(/<img src=\"/,"");
		t = t.replace(/\"/,"");
		x[x.length] = t;
	}
	return x;
}
function getClientId(){
	clientId = getCookie("clientId");
	if(clientId == null | clientId == ""){
		var r = Math.floor(Math.random()*1000+1);
		var date = new Date();
		clientId = "" + date.getHours() + date.getMinutes() + date.getSeconds()+date.getMilliseconds()+r;
		setCookie("clientId",clientId);
	}
};
var clientId = "";
var editor = null;
var fileIds =new Object();
$(document).ready(function() {
	
	//每次打开页面 生成一个客户端id
	getClientId();
	editorInit();

	//test
	$("#article-submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		articleSubmit();

		
		//var reg = /<img src=\".*?\">/gi;
		//var reg = /<img.*src=\".*?\"/gi;

	});
	
	//test
	$("#pic_btn").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();		
		fileUpload();
	});
	
	
});