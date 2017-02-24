

function loadSidebar(){
	$.get(getContextPath()+"/user/sidebar.html",function(data,status){
		 var head = $("#sidebar-div");
		 head.empty();
		 head.html(data);
		 
		 var isAdmin = getCookie("isAdmin");
		 if(isAdmin=="true"){
			 $("#side-action-btn").append('<a href="'+
					 getContextPath()+'/admin/index.html" class="btn btn-default">管理员入口</a>');
		 }
		 
		 //showUserCenter();
	}); 	
}

$(document).ready(function () {
	
	loadSidebar();
	
});	