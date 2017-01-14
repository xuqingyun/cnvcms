
//获取url中的参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg); //匹配目标参数
   if (r != null) return unescape(r[2]); return null; //返回参数值
}

//读取导航栏
function loadNavigation(){
	$.get(getContextPath()+"/navigation.html",function(data,status){
		 var head = $("#navigation-div");
		 head.empty();
		 head.html(data);
	}); 	
}

//加载栏目
function loadChannel(){
	$.get(getContextPath()+"/api/channel/channels",function(data,status){
		var channels = data.data;
		//筛选出顶层栏目
        var topChannels = $.grep(channels,function(value){
            return value.parentId < 0;//筛选父id为-1的
        });

		str = '<li class="active"><a href="index.html"><b>首页</b></a></li>';
		for(i in topChannels){
			var pchannel = topChannels[i];
			//筛选出子栏目
	        var subChannels = $.grep(channels,function(value){
	            return value.parentId == pchannel.id;
	        });
	        substr = "";
	        if(subChannels != null && subChannels.length>0){
	        	substr += '<ul class="dropdown-menu">';
	        	for(j in subChannels){
		        	substr += '<li><a href="#">'+subChannels[j].name+'</a></li>';
		        }
	        	substr += '</ul>';
	        }
	        
			str += '<li class="dropdown" columnid="1"><a href="article_list.html?cid='+pchannel.id+'"><b>'
				+pchannel.name+'</b></a>'+substr+'</li>';
		}
		 var navmenu = $("#top-navbar");
		 navmenu.empty();
		 navmenu.html(str);
	}); 	
}

function testnav(){
	//alert("I am in navigation");
	 var col = $(".dropdown[columnid='1']");
	 //col.empty();
	 col.append('<ul class="dropdown-menu"> <li><a href="#">子菜单1</a></li></ul>');
}

function getContextPath(){
	if(contextPath == null){
		var localObj = window.location;
		var contextPath = localObj.pathname.split("/")[1];
		var basePath = localObj.protocol+"//"+localObj.host+"/"+contextPath;
		contextPath = basePath;
	}
	return contextPath;
	
}
var contextPath = null;
$(document).ready(function () {
	loadNavigation();
	loadChannel();
	//loadNavigation();
});	