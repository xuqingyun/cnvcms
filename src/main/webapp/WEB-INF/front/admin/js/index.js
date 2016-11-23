function iframeHeight(h){
	if(h==null){
		var mainheight = $("#right_panel_iframe").contents().find("body").height()+30;
	}else{
		mainheight = h;
	}
	if(mainheight<400){
		mainheight = 400;
	}
	$("#right_panel_iframe").height(mainheight);
	return mainheight;
}

function changeRightPanel(panel){
	if(panel=="user"){
		$("#right_panel_iframe").attr("src","user_panel.html");
	}else if(panel=="group"){
		$("#right_panel_iframe").attr("src","group_panel.html");
	}else if(panel=="role"){
		$("#right_panel_iframe").attr("src","role_panel.html");
	}
}
$(document).ready(function() {
	
	
});