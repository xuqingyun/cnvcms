
function showChannelAdd(){
	showChannelType();
	showParentChannelSel();
};

function showChannelType(){
 	$.get("../api/channel/channelTypes/",function(data,status){
	 	
		if(status == "success"){
			channelTypes = data.data;
			var str="";
			for(i in channelTypes){
				channelStr = channelTypes[i];
				str += '<option value="'+i+'">'+channelStr+'</option>';
			}
			$("#input_channelType").empty();
			$("#input_channelType").append(str);
		}
 	});	
};

function showParentChannelSel(){
	
	var itemid = getUrlParam("id");
	if(itemid == null | itemid == ""){
		itemid = -1;
	}
 	$.get("../api/channel/topChannels",function(data,status){
	 	
		if(status == "success"){
			channels = data.data;
			var str='<option value="-1" >根栏目</option>';
			for(i in channels){
				channel = channels[i];
				str += '<option value="'+channel.id+'">'+channel.name+'</option>';
			}
			$("#input_parentChannel").empty();
			$("#input_parentChannel").append(str);
			$('option[value="'+itemid+'"]').attr("selected",'selected');
		}
 	});	
};

function channelAdd(){
	 
	var customLink = $("#input_customLink").val();
	var customLinkUrl = null;
	if(customLink==1){
		customLinkUrl = $("#input_customLinkUrl").val()
	}
	 var channel = { 
		'name': $("#input_name").val(), 
		'channelType': $("#input_channelType").val(), 
		'parentId': $("#input_parentChannel").val(), 
		'isIndex': 	$("#input_isIndex").val(), 
		'isTopNav': 	$("#input_isTopNav").val(), 
		'isRecommend': 	$("#input_isRecommend").val(), 
		'customLink': 	$("#input_customLink").val(), 
		'customLinkUrl': 	customLinkUrl, 
		'status': 	$("#input_status").val(), 
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/channel/add", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(channel), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='channel_panel.html';
			 
			}else{
				alert("添加失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("添加失败！\nstatus:"+msg.status);
	     }
	  });
 
};

$(document).ready(function() {
	loadNavigation();
	loadNavigation();
	
	
	showChannelAdd();
	
	$("#form_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();

		
		channelAdd();
		//ftest();
	});
	
});