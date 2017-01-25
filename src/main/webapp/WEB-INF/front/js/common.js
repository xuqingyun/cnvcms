/**
 * 返回顶部
 * Author:peggy
 */
backToTop = function(className){
	var $backToTopTxt = "返回顶部", $backToTopEle = $('<a class="backToTop" href="javascript:void(0);" class="ie6png"></a>').appendTo($(className))
    .text('').attr("title", $backToTopTxt).click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
	}), $backToTopFun = function() {
	    var st = $(document).scrollTop(), winh = $(window).height();
	    (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
	    //IE6下的定位
	    if (!window.XMLHttpRequest) {
	        $backToTopEle.css("top", st + winh - 166);
	    }
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun(); });
};

//获取url中的参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg); //匹配目标参数
   if (r != null) {
	   param =  unescape(r[2]);
	   if(param != "") return param;
   }
   return null; //返回参数值
}

//读取导航栏
function loadNavigation(){
	$.get(getContextPath()+"/navigation.html",function(data,status){
		 var head = $("#navigation-div");
		 head.empty();
		 head.html(data);
		 //showUserCenter();
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

		str = '<li class="topcol"><a columnid="index" href="'+getContextPath()+'/index.html"><b>首页</b></a></li>';
		for(i in topChannels){
			var pchannel = topChannels[i];
			//筛选出子栏目
	        var subChannels = $.grep(channels,function(value){
	            return value.parentId == pchannel.id;
	        });
	        substr = "";
	        if(subChannels != null && subChannels.length>0){
	        	substr += '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">';
	        	for(j in subChannels){
	        		var sc = subChannels[j];
		        	substr += '<li><a columnid="'+sc.id+'" \
		        	href="'+getContextPath()+'/article_list.html?cid='+sc.id+'">'+sc.name+'</a></li>';
		        }
	        	substr += '</ul>';
	        }
	        
			str += '<li class="dropdown topcol" >\
				<a columnid="'+pchannel.id+'" \
				href="'+getContextPath()+'/article_list.html?cid='+pchannel.id+'" \
					class="dropdown-toggle" data-toggle="dropdown">\
				<b>'+pchannel.name+'</b>';
				if(substr != ""){
					str += '<b class="caret"></b>';
				}
			str += '</a>'+substr+'</li>';
		}
		 var navmenu = $("#top-navbar");
		 navmenu.empty();
		 navmenu.html(str);
		 
		 var cid = getUrlParam("cid");
		 if(cid == null){
			var obj  = $("a[columnid='index']").parents(".topcol"); 
			obj.attr("class","active topcol");
		 }else{
			var obj  = $("a[columnid='"+cid+"']").parents(".topcol"); 
			obj.attr("class","dropdown active topcol");
		 }
	}); 	
}

/*
 * 导航栏右端用户中心
 */

function showUserCenter(){
	var str = '\
		<li><a  href="'+getContextPath()+'/user/home.html"><i class="glyphicon glyphicon-user"></i>用户中心</a>\
		</li>\
		<li><a href="'+getContextPath()+'/user/setting.html"><i class="glyphicon glyphicon-cog"></i> 设置</a>\
		</li>\
		<li class="divider"></li>\
		<li><a  href="'+getContextPath()+'/api/admin/login.out"><i class="glyphicon glyphicon-log-out"></i>退出</a>\
		</li>';
	obj = $("#top-usercenter");
	obj.html(str);
}
function changeNav(){
	if(navshow==false){
		$("#my-navbar-collapse").attr("style","height:auto;")
		navshow=true;
	}else{
		$("#my-navbar-collapse").attr("style","height:0px;")
		navshow=false;
	}
}
/*
 * 获取网站根路径
 * 如http://111.111.111.111/abc
 */
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
var navshow = false;
$(document).ready(function () {
	loadNavigation();
	loadChannel();
/*	$("#nav-trigger").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();
		changeNav();
	});	*/
});	