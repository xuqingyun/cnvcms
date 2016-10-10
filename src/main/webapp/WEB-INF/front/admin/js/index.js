
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
		var str = '<tr id="listitem';
		for(var s in item){
			if(s=="id"){
				str += item[s]+'" class="odd"><td><input type="checkbox" name="" /></td>';
				//str +='" class="odd"><td><input type="checkbox" name="" /></td>';
				//alert(str);
			}else{
				str += '<td>'+item[s]+'</td>';
			}				
		}
		str += '<td><span id="item_delete" ><a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a></span ></td>';
		str += '<td><span id="item_delete" ><a href="#"><img src="images/trash.gif" alt="" title="" border="0"/></a></span ></td>';
		return str;
	}
	function addTableHead(headlist){
		var str = "";
		for(var s in headlist){
			str +="<th>"+headlist[s]+"</th>";
		}
		$("#table_head").append(str);
	};
	
	function showUserTable(){
		addTableHead(['用户名','昵称','邮箱','电话','状态','创建时间','编辑','删除']);
	}
	
	showUserTable();
	//$("#right_wrap").load("index_right.html");
    //$("#footer").load("footer.html");
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
    
    
    $("#item_delete").live("click",function(){
	
	 	//alert("delete");
		$(this).parent().parent().remove();

	});
});