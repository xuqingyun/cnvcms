
function yesnoStr(flag){
	if(flag=="0")
		return "否";
	else
		return "是";
}
function statusStr(flag){
	if(flag=="0")
		return "停用";
	else
		return "启用";
}

function channelTreeOnClick(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.name);
	if(treeNode.id == "-1"){
		showChannelList(-1,"根目录");
	}else	if(treeNode.parentId=="-1"){
		showChannelList(treeNode.id, treeNode.name);
		currentPid = treeNode.id;
	}else{
		showChannelList(treeNode.parentId, treeNode.name);
		treeNode.id = treeNode.parentId;
	}
	
};

function showChannelTree(){
 	$.get("../api/channel/channels/",function(data,status){
	 	
		if(status == "success"){
			var ctree =  data.data;
			ctree.unshift({id:-1,name:"文章栏目系统",parentId:-2,open:true});
			treeObj = $.fn.zTree.init($("#channel-tree"), setting,ctree);
			treeObj.expandAll(true);
		}else{
			alert("栏目加载失败");
		}

 	});		
}

function loadChannelTypes(){
 	$.get("../api/channel/channelTypes/",function(data,status){
	 	
		if(status == "success"){
			channelTypes = data.data;
			showChannelList(-1,"根目录");
		}
 	});	
}

function showChannelList(id,name){
	
	 $('#table-head').html("当前位置: "+name);
    //初始化表格内容
	if(table==null){
	    table = $('#dataTables-list').DataTable({
	        //responsive: true,
	        //"order": [[ 1, "asc" ]],
	    	"ordering": false,
	        "bFilter": false,    //去掉搜索框
	        "bLengthChange": false,   //去掉每页显示多少条数据方法
	        "scrollX": true,	//横向滚动条
	        "stateSave" : true,	//保存状态
	        "info": false,	//左下角信息不显示
	        //data : users,
	        ajax : "../api/channel/subChannels/"+id,
		 	columns: [
		 	    {"data": null},      
				{"data": "id"},
	            {"data": "name"},
	            {"data": "channelType"},
	            {"data": "customLink"},
	            {"data": "isIndex"},
	            {"data": "isTopNav"},
	            {"data": "isRecommend"},
	            {"data": "status"},
	            {"data": null}
	        ],
			 "columnDefs": [{  
				"orderable" : false,	//不可排序
				"targets": -1,  
				"data": null,  
				defaultContent: '<a href="#" class="edit btn btn-default btn-xs"><i class="fa fa-edit">编辑</i> </a>' +
				   ' <a href="#" class="delete btn btn-default btn-xs"><i class="fa fa-times">删除</i> </a>',
			},
			{  
				"orderable" : false,	//不可排序
				"targets": 0,  
				"data": null,  
				defaultContent: '<input type="checkbox" id="list_checkbox">', 
			}
			 ],
			  "rowCallback": function( row, data, index ) {
				  //将数字转换为字符串显示
				  	  $('td:eq(3)', row).html(channelTypes[data.channelType]);
				      $('td:eq(4)', row).html(yesnoStr(data.customLink));
				      $('td:eq(5)', row).html(yesnoStr(data.isIndex));
				      $('td:eq(6)', row).html(yesnoStr(data.isTopNav));
				      $('td:eq(7)', row).html(yesnoStr(data.isRecommend));
				      $('td:eq(8)', row).html(statusStr(data.status));
		
				  }    
		});	
	}else{
		table.ajax.url("../api/channel/subChannels/"+id).load();
	}
		
	
};


function channelDelete(ele){
    //var table = $('#dataTables-list').DataTable();
    var row = $(ele).parents('tr');
    var rowdata= table.row(row).data();
    var id = rowdata.id;
    
 	$.get("../api/channel/delete/"+id,function(data,status){
	 	
		if(status == "success" && data.flag == "success"){
			window.location.href = "channel_panel.html";
		}else{
			alert("删除失败");
		}

 	});	
}

function groupSelectedDelete(){
	
	//var table = $('#dataTables-list').DataTable();
	
	var userids = new Array();
   	 $("#list_checkbox:checked").each(function (index, domEle){
        var row = $(domEle).parents('tr');        
        var rowdata= table.row(row).data();
        userids[index] = rowdata.id;
	 });
   	 if(userids.length ==0){
   		 return;
   	 }
	 $.ajax({ 
	     type:"POST", 
	     url:"../api/group/deleteIds/", 
	     dataType:"json",      
	     contentType:"application/json",               
	     data:JSON.stringify(userids), 
	     success:function(data,status){ 
			if(status == "success" && data.flag == "success"){
				//changeIndexRightPanel('user_panel');
				table.ajax.reload(null,false);
			}else{
				alert("删除失败!\n"+data.flag);
			}
	
	     },
	     error:function(msg){
	    	 alert("删除失败！\najax错误,status:"+msg.status);
	     }
	  });	
};



var table;
var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentId",
				rootPId: 0,
			}
		},
		callback: {
			onClick: channelTreeOnClick
		}
	};
var treeObj;
var channelTypes;
var currentPid  = -1;

$(document).ready(function() {
	
	
	//loadNavigation();
	//loadNavigation();	
	
	loadChannelTypes();
	//初始化，栏目树
	showChannelTree();
	
	
	
	//初始化，默认显示用户列表
	//showGroupList();
    
	//row 操作-edit 点击事件
    $('#dataTables-list tbody').on('click', 'a.edit', function(e) {
    	e.preventDefault();
    	
    	//var table = $('#dataTables-list').DataTable();
        var row = $(this).parents('tr');        
        var rowdata= table.row(row).data();
        var id = rowdata.id;
        
        window.location.href = "channel_panel_edit.html?id="+id;

    });
    

    
    //列表上方 添加用户按钮
    $('.panel-heading #channel_add').click(function(){
    	window.location.href = "channel_panel_add.html?id="+currentPid;
    });  
    
    //列表上方 删除所选按钮
    $('#delete_select').click( function () {
    	//groupSelectedDelete();	
    });
    
 // 初始化刪除按钮
    $('#dataTables-list tbody').on('click', 'a.delete', function(e) {
        e.preventDefault();
        if (confirm("确定要删除该栏目？")) {
          channelDelete(this);
        }
     
    });
    


    
    //行点击响应
    $('#dataTables-list tbody').on( 'click', 'tr', function () {
    	 //var table = $('#dataTables-user').DataTable();
    	 var trs= $(this).find("input");
    	 var checkpre  = $(trs).attr('checked');
    	 if(checkpre == "checked"){
    		 $(trs).attr('checked',false);
    	 }else{
    		 $(trs).attr('checked',true);
    	 }
    	 
    } );
 
    // 全选按钮
    var listCheckboxsStatus = new Boolean('true');
    $('#select_all').click( function (e) {
        e.preventDefault();
        //var table = $('#dataTables-user').DataTable();
        var listcheckboxs = $('tbody #list_checkbox');
        
        
        listcheckboxs.attr('checked',listCheckboxsStatus);
        listCheckboxsStatus = !listCheckboxsStatus;
        	
    });    
});	

