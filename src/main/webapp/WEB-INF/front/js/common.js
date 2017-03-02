
//写cookies
function setCookie(name,value)
{
	var minute = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + minute*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读cookies
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
//删除cookies
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
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
		 loadChannel();
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
function loginOut(){
	$.get(getContextPath()+'/api/admin/login.out',function(data,status){
		if(status == "success" && data.flag == "success"){
			var loginUser = getCookie("loginUser");
		}
	});
	return false;
}

/*
 * 导航栏右端用户中心
 */

function showUserCenter(){
	var loginUser = getCookie("loginUser");
	
	if(loginUser != null){
	
		$("#login-link").html('<a>您好, &nbsp</a>');
		var str = '\
			<a class="dropdown-toggle" data-toggle="dropdown" href="#">'+loginUser+'\
			&nbsp&nbsp&nbsp&nbsp<i class="glyphicon glyphicon-user"></i>\
				<i class="glyphicon glyphicon-menu-down"></i>\
			</a>\
			<ul class="dropdown-menu dropdown-user">\
			<li><a  href="'+getContextPath()+'/user/home.html"><i class="glyphicon glyphicon-user"></i>用户中心</a>\
			</li>\
			<li><a href="'+getContextPath()+'/user/user_profile.html"><i class="glyphicon glyphicon-cog"></i> 设置</a>\
			</li>\
			<li class="divider"></li>\
			<li><a  href=""javascript:void(0)" onclick="loginOut()"><i class="glyphicon glyphicon-log-out"></i>退出</a>\
			</li>\
			</ul>';
		obj = $("#top-usercenter");
		obj.html(str);
		
		//$("#login-link").html('<a href="'+getContextPath()+'/login.html">登录</a>');
		//$("#register-link").html('<a href="'+getContextPath()+'/register.html">注册</a>');
	}else{
		
		$("#login-link").html('<a href="'+getContextPath()+'/login.html">登录</a>');
		$("#register-link").html('<a href="'+getContextPath()+'/register.html">注册</a>');
	}
   
	
	
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

//当前网站根路径
var contextPath = null;
var navshow = false;


$(document).ready(function () {
	
	loadNavigation();	

});	