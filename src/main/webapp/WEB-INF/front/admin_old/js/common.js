	function additem(item){
		var str = '<tr itemid="'+item["id"]+'" id="listitem'+item["id"]+'" class="odd">';
		for(var s in item){
			if(s=="id"){
				str += '<td><input type="checkbox" name="" /></td>';
				//str +='" class="odd"><td><input type="checkbox" name="" /></td>';
			}else if(s=="name" | s=="username"){
				str += '<td><span id="item_detail" ><a href="#">'+item[s]+'</a></span></td>';
			}else if(item[s] != null){
				str += '<td>'+item[s]+'</td>';
			}				
		}
		str += '<td><span id="item_edit" > \
					<a href="#"><img src="images/edit.png" alt="" title="" border="0"/></a> \
				</span ></td> \
				<td><span id="item_delete" > \
					<a href="#"><img src="images/trash.gif" alt="" title="" border="0"/></a> \
				</span ></td> \
				</tr>';
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
	function updateIFrame(){
		var h = $(document).height(); 
		//重新调整高度
		window.parent.iframeHeight(h);
	}
	    