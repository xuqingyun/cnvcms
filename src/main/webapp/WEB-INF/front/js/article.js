
function showArticle(){
	var aid = getUrlParam("id");
	if(aid  == null){
		window.location.href= getContextPath()+"/index.html";
	}
	$.get(getContextPath()+"/api/article/detail/"+aid,function(data,status){
		if(status  == "success"){
			if(data.flag=="success"){
				var article = data.data;
				var imgUrl = data.imgUrl;
				
				
				$("#artical_topic").html(article.title);
				$("#article_content").html(article.content);
				$("#article_author").html(article.author);
				$("#article_date").html(article.createDate);
				
				var imgs = $("#article_content").find("img");
				for(var i=0 ;i<imgs.length;i++){
					var imgid = imgs[i];
					var picid = $(imgid).attr("imgid");
					//如果是上传的图片
					if(picid!=null){
						//设置img标签的src属性
						$(imgid).attr("src",imgUrl[picid]);
					}
				}
				
			}else{
				alert(data.flag);
				window.location.href= getContextPath()+"/index.html";
			}
		}else{
			alert("获取内容失败");
			window.location.href= getContextPath()+"/index.html";
		}
	});
}

$(document).ready(function () {
	showArticle();
});	