
var $ = jQuery.noConflict();
$(function() {
	$('#tabsmenu').tabify();
	$(".toggle_container").hide(); 
	$(".trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false;
	});
});

$(document).ready(function () {
	//验证是否登录,否则跳转到登录页面
 	$.get("../api/admin/login.json",function(data,status){
		if(status != "success" || data.login != "success"){
			window.location.href="login.html"; 
		}
 	});

	var user={
			
			id:"1",
			name:"name",
			nick:"nickname",
			email:"abc@qq.com",
			phone:"123484454",
			status:"1",
			date:"2016-09-11"
	}

	function additem(item){
		var str = '<tr itemid="'+item["id"]+'" id="listitem';
		for(var s in item){
			if(s=="id"){
				str += item[s]+'" class="odd"><td><input type="checkbox" name="" /></td>';
				//str +='" class="odd"><td><input type="checkbox" name="" /></td>';
				//alert(str);
			}else{
				str += '<td>'+item[s]+'</td>';
			}				
		}
		str += '<td><span id="item_edit" ><a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a></span ></td>';
		str += '<td><span id="item_delete" ><a href="#"><img src="images/trash.gif" alt="" title="" border="0"/></a></span ></td>';
		return str;
	}
	function addTableHead(headlist){
		var str = "<th></th> ";
		for(var s in headlist){
			str +="<th>"+headlist[s]+"</th>";
		}
		$("#table_head").empty();
		$("#table_head").append(str);
 	
	};
	
	function showPanel(panel){
		$(".center_panel").hide();
		$(panel).show();
	};
	
	function showUserTable(){
		//关闭所有面板，显示用户面板
		showPanel("#div_table_and_btn");
		
		$("#welecome_msg").hide();
		$("#table_title").text("用户列表");
		$("#table_msg").text("用户列表信息");
		addTableHead(['用户名','密码','昵称','邮箱','电话','状态','创建时间','编辑','删除']);
		var stru = "";
	 	$.get("../api/user/users",function(data,status){
	 	
			if(status == "success"){
				for(var d in data.users){
		 			stru +=  additem(data.users[d]);
		 		}
				$("#table_list").empty();
				$("#table_list").append(stru);
			}
		
	 	});
	};

	//showUserTable();
	//$("#user_manage").trigger("click");
	$(".center_panel").hide();
	$("#div_table_and_btn").show();
	$("#table_btn").hide();
	
	//用户管理事件响应
	$("#user_manage").click(function(){
		showUserTable();
	});
	
	//用户添加事件响应
	$("#user_add").click(function(){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_add");
	
	});
	

	//用户添加提交按钮
	$("#user_add_form_submit").click(function(){
        // 获取表单中的参数
		var params = $("#add_form").serialize();  
		var d = new Date();
		var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		//alert(date);
		
        var user = { 
			'username': $("#add_username").val(), 
			'password': $("#add_password").val(), 
			'nickname': $("#add_nickname").val(), 
			'email': 	$("#add_email").val(), 
			'phone': 	$("#add_phone").val(), 
			'status': 	"1", 
			'createDate': date
		}; 
       
        $.ajax({ 
            type:"POST", 
            url:"../api/user/add", 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(user), 
            success:function(data,status){ 
    			if(status == "success" && data.flag == "success"){
                	//alert("用户添加成功！");
                	$("#user_manage").trigger("click");
    			}else{
    				alert("添加失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("添加失败！\nstatus:"+msg.status);
            }
         });
        
	});
	//用户编辑事件响应
	$("#item_edit").live("click",function(){
		//关闭所有面板，显示添加用户面板
		showPanel("#div_user_edit");

		
		var itemid = $(this).parent().parent().attr("itemid");
		
	 	$.get("../api/user/detail/"+itemid,function(data,status){
		 	
			if(status == "success"){
				var user = data.user;
				$("#edit_username").attr('value',user["username"]);
				$("#edit_password").attr('value',user["password"]);
				$("#edit_nickname").attr('value',user["nickname"]);
				$("#edit_email").attr('value',user["email"]);
				$("#edit_phone").attr('value',user["phone"]);
				$("#edit_status").attr('value',user["status"]);
				$("#edit_createDate").attr('value',user["createDate"]);
				if(user["status"] == "1"){
					$("#edit_select_on").attr('selected',"true");
				}else{
					$("#edit_select_off").attr('selected',"true");
				}
				$("#edit_form").attr('userid',user["id"]);
				
			}
		
	 	});
		
	});	

	//用户编辑提交按钮
	$("#user_edit_form_submit").click(function(){
        // 获取表单中的参数
		var userid = $("#edit_form").attr('userid');
        var user = { 
			'id'	:	userid,
        	'username': $("#edit_username").val(), 
			'password': $("#edit_password").val(), 
			'nickname': $("#edit_nickname").val(), 
			'email': 	$("#edit_email").val(), 
			'phone': 	$("#edit_phone").val(), 
			'status': 	$("#edit_form_select").val(), 
			'createDate': $("#edit_createDate").val()
		}; 
       
        $.ajax({ 
            type:"POST", 
            url:"../api/user/update/"+userid, 
            dataType:"json",      
            contentType:"application/json",               
            data:JSON.stringify(user), 
            success:function(data,status){ 
    			if(status == "success" && data.flag == "success"){
                	//alert("用户添加成功！");
                	$("#user_manage").trigger("click");
    			}else{
    				alert("添加失败!\n"+data.flag);
    			}

            },
            error:function(msg){
            	alert("添加失败！\nstatus:"+msg.status);
            }
         });
        
	});
	
	//删除按钮响应
    $("#item_delete").live("click",function(){
    	
    	var itemid = $(this).parent().parent().attr("itemid");
	 	$.get("../api/user/delete/"+itemid,function(data,status){
		 	
			if(status == "success" && data.flag == "success"){
				
				$("#listitem"+itemid).remove();
			}else{
				alert("删除失败");
			}

	 	});
    	
		

	});
	
    var listid=0;
  
    $("#testadd").click(function(){
    	//alter("test add");
    	 $("#testbtn").text("Hello world!"); 
    	 var item1 = '<tr id="listitem' + listid+'" class="odd"> <td><input type="checkbox" name="" /></td><td>item' +
    	  listid +
    	 '</td> <td>Lorem ipsum dolor sit amet consectetur</td><td>45$</td><td>10/04/2011</td><td>web design</td><td>John</td><td><span id="item_edit" ><a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a></span ></td><td><span id="item_delete" ><a href="#"><img src="images/trash.gif" alt="" title="" border="0"/></a></span ></td></tr>';
  	 	listid ++;
    	 
		var item2 = additem(user);
		$("#table_list").append(item2);
    });
    
    $("#testdel").live("click",function(){	 	 	
	 	//alert(t);
	 	if(listid > 0){
	 		listid--;
	 		var t = $("#listitem"+listid).text();
	 		$("#listitem"+listid).remove();
	 	}
	});
    
    

});