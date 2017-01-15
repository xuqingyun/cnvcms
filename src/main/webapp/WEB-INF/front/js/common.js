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
		 showUserCenter();
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
	        	substr += '<ul class="dropdown-menu">';
	        	for(j in subChannels){
	        		var sc = subChannels[j];
		        	substr += '<li><a columnid="'+sc.id+'" \
		        	href="'+getContextPath()+'/article_list.html?cid='+sc.id+'">'+sc.name+'</a></li>';
		        }
	        	substr += '</ul>';
	        }
	        
			str += '<li class="dropdown topcol" ><a columnid="'+pchannel.id+'" \
				href="'+getContextPath()+'/article_list.html?cid='+pchannel.id+'">\
				<b>'+pchannel.name+'</b></a>'+substr+'</li>';
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
		  <li class="ie6png divider-vertical" \
		style="_width: 30px;_height: 40px;_background: url('+getContextPath()+'/template/images/icons.png) no-repeat 10px -106px;">\
		  <a class="dropdown-toggle clearfix" href="'+getContextPath()+'/user/home.html" style="padding: 7px 5px;">\
		    <img class="logo-before pull-left" src="'+getContextPath()+'/template/images/avatar-icon.png" />\
		  </a>\
	      <ul class="dropdown-menu">\
                <li><a href="#"><i class="fa fa-user fa-fw"></i> 用户中心</a>\
                </li>\
                <li><a href="#"><i class="fa fa-gear fa-fw"></i> 设置</a>\
                </li>\
                <li class="divider"></li>\
                <li><a href="'+getContextPath()+'/api/admin/login.out"><i class="fa fa-sign-out fa-fw"></i> 退出登录</a>\
                </li>\
            </ul>\
		 </li>';
	obj = $("#top-usercenter");
	obj.html(str);
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