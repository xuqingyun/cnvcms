
//获取url中的参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg); //匹配目标参数
   if (r != null) return unescape(r[2]); return null; //返回参数值
}
function loadNavigation(){
	$.get("navigation.html",function(data,status){
		 var head = $("#navigation-div");
		 head.empty();
		 head.html(data);
	}); 	
}
function loadNav(){
		$.get("head.html",function(data,status){
			 var divid = $("#head-div");
			 //divid.empty();
			 divid.html(data);
		}); 
			
		$.get("sidebar.html",function(data,status){
			 var divid = $("#sidebar-div");
			//divid.empty();
			 divid.html(data);
		});		
}



function showGroupBox(boxid,gids){
 	$.get("../api/group/groups",function(data,status){
	 	
		if(status == "success"){
			var groups = data.data;
			var str="";
			for(i in groups){
				var group = groups[i];
				str += '<label class="checkbox-inline"><input id="group_checkbox" groupid="'+group.id
					+'" type="checkbox">'+group.name+'</input></label>';
				
			}
	
			$(boxid).empty();
			$(boxid).append(str);
			
			for(i in gids){
				$('#group_checkbox[groupid="'+gids[i]+'"]').attr("checked",'true');
			}
			
		}
 	});
}
	
function showRoleBox(boxid,gids){
 	$.get("../api/role/roles",function(data,status){
		 	
			if(status == "success"){
				var roles = data.data;
				var str="";
				for(i in roles){
					var role = roles[i];
					str += '<label class="checkbox-inline"><input id="role_checkbox" roleid="'+role.id
					+'" type="checkbox">'+role.name+'</input></label>';
				}

				$(boxid).empty();
				$(boxid).append(str);
				
				for(i in gids){
					$('#role_checkbox[roleid="'+gids[i]+'"]').attr("checked",'true');
				}
				
			}
	 	});
}
function loginOut(){
	$.get('../api/admin/login.out',function(data,status){
		if(status == "success" && data.flag == "success"){
			window.location.href= "../login.html";
		}
	});
	return false;
}

$(document).ready(function () {
	loadNavigation();
	//loadNavigation();
});	