

function loadNavigation(){
	$.get("navigation.html",function(data,status){
		 var head = $("#navigation-div");
		 //head.empty();
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

function updateIFrame(){
	var h = $(document.body).height();
	//var h = document.body.scrollHeight;
	//$(document).height(); 
	//重新调整高度
	var piframe = window.parent.document.getElementById('right_panel_iframe');
	if(piframe != null){
		 window.parent.iframeHeight(h);
	}
	
};
function showPanel(panel){
	$(".center_panel").hide();
	$(panel).show();
	
};
function changeIndexRightPanel(panel){

	var piframe = window.parent.document.getElementById('right_panel_iframe');
	if(piframe != null){
		 window.parent.changeRightPanel(panel);
	}
	
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