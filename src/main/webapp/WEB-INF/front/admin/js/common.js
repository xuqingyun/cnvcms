function updateIFrame(){
	var h = $(document.body).height();
	//$(document).height(); 
	//重新调整高度
	var piframe = window.parent.document.getElementById('right_panel_iframe');
	if(piframe != null){
		 window.parent.iframeHeight(h);
	}
	
}
function showPanel(panel){
	$(".center_panel").hide();
	$(panel).show();
	
};