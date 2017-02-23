

function loadSidebar(){
	$.get(getContextPath()+"/user/sidebar.html",function(data,status){
		 var head = $("#sidebar-div");
		 head.empty();
		 head.html(data);
		 //showUserCenter();
	}); 	
}
$(document).ready(function () {
	loadSidebar();

});	