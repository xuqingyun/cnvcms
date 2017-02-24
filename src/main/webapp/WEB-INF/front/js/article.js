
function showArticle(){
	var aid = getUrlParam("id");
	if(aid  == null){
		window.location.href= getContextPath()+"/index.html";
	}
	$.get(getContextPath()+"/api/article/detail/"+aid,function(data,status){
		if(status  == "success"){
			if(data.flag=="success"){
				var article = data.data;
				$("#artical_topic").html(article.title);
				$("#article_content").html(article.content);
				$("#article_author").html(article.author);
				$("#article_date").html(article.createDate);
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