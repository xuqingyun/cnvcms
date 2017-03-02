function addListItem(a){
	
	var str = '\
	<div class="list-item">\
		<div class="col-sm-4 col-lg-3">\
		<a href="javascript:;" title="标题"><img  class="img-responsive" alt="标题标题" src="images/list_item.jpg"></a>\
		</div>\
		<div class="col-sm-8 col-lg-9">\
			<div class="item-head">\
				<h4 class="head">\
					<a title="" href="'+getContextPath()+'/article.html?id='+a.id+'">'+a.title+'</a>\
				</h4>\
				<div class="pull-left">\
					<i class="info"><a href="javascript:;" target="_blank">'+a.author+'</a></i>\
					<i class="info"><a href="javascript:;" target="_blank">分类</a></i>   \
					<i class="info">'+a.createDate+'</i>\
				</div>	\
				<div class="pull-right">\
					<span class="glyphicon glyphicon-heart  " href="void(0);" title="'+a.fellows+'人关注">'+a.fellows+'3人</span>	\
					<span class="glyphicon glyphicon-eye-open" href="void(0);" title="'+a.readTimes+'次查看">'+a.readTimes+'次</span>\
				</div>\
			</div>\
			<div class="item-body">'+a.summary+'\
			</div>\
		</div>\
	</div>';
	return str;
}
function showArticleList(){
	var channelId = getUrlParam("cid");
	//alert(channelId);
	if(channelId  == null){
		window.location.href= getContextPath()+"/index.html";
	}
	$.get(getContextPath()+"/api/article/channel/"+channelId,function(data,status){
		if(status  == "success"){
			if(data.flag=="success"){
				var articles = data.data;
				var str = "";
				for(var i in articles){
					str += addListItem(articles[i]);
				}
				$("#article-list-div").html(str);
				
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
	showArticleList();
});	