
var defaultPanel = "user_panel";
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
	var  htmfile = panel + ".html";
	$("#right_panel_iframe").attr("src",htmfile);

}
$(document).ready(function() {
	
	
});