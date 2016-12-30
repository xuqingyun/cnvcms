
function showChannelEdit(id){
 	$.get("../api/channel/detail/"+id,function(data,status){
		if(status == "success"){
			channel = data.data;
			$("#input_name").attr("itemid",channel.id);
			$("#input_name").attr("value",channel.name);
			//$('#group_checkbox[groupid="'+gids[i]+'"]').attr("checked",'true');
			$('#input_isIndex[value="'+channel.isIndex+'"]').attr("checked",'true');
			$('#input_isTopNav[value="'+channel.isTopNav+'"]').attr("checked",'true');
			$('#input_isRecommend[value="'+channel.isRecommend+'"]').attr("checked",'true');
			$('#input_customLink[value="'+channel.customLink+'"]').attr("checked",'true');
			$("#input_customLinkUrl").attr("value",channel.customLinkUrl);
		
			showChannelType(channel.channelType);
			showParentChannelSel(channel.parentId);
		}
 	});	

};

function showChannelType(ct){
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
			$('#input_channelType option[value="'+ct+'"]').attr("selected",'selected');
		}
 	});	
};

function showParentChannelSel(pid){
	

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
			$('#input_parentChannel option[value="'+pid+'"]').attr("selected",'selected');
		}
 	});	
};

function channelUpdate(){
	 
	var customLink = $("#input_customLink:checked").val();
	var customLinkUrl = null;
	if(customLink==1){
		customLinkUrl = $("#input_customLinkUrl").val()
	}
	 var channel = { 
		'id' : $("#input_name").attr("itemid"),	 
		'name': $("#input_name").val(), 
		'channelType': $("#input_channelType").val(), 
		'parentId': $("#input_parentChannel").val(), 
		'isIndex': 	$("#input_isIndex:checked").val(), 
		'isTopNav': 	$("#input_isTopNav:checked").val(), 
		'isRecommend': 	$("#input_isRecommend:checked").val(), 
		'customLink': 	$("#input_customLink:checked").val(), 
		'customLinkUrl': 	customLinkUrl, 
		'status': 	$("#input_status").val(), 
		}; 
	 
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/channel/update/", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(channel), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//alert("用户添加成功！");
				 window.location.href='channel_panel.html';
			 
			}else{
				alert("更新失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("更新失败！\nstatus:"+msg.status);
	     }
	  });
 
};
var channelId = null;
$(document).ready(function() {

	channelId  = getUrlParam("id");
	if(channelId == null | channelId == ""){
		window.location.href = "channel_panel.html"
	}	
	showChannelEdit(channelId);
	
	$("#form_submit").on("click", function(event){
		//取消事件行为，非常重要！否则add中的post请求会被取消
		event.preventDefault();

		
		channelUpdate();
		//ftest();
	});
	
});