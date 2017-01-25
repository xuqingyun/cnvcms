package com.cnv.cms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.Group;
import com.cnv.cms.model.User;
import com.cnv.cms.service.GroupService;

@Controller
@RequestMapping("/api/group")
public class GroupController {
	@Autowired
	 @Qualifier("groupServiceImpl")
	private GroupService groupService;
	
	
	
	
	@RequestMapping(value="/groups",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  groups(){
		System.out.println("----groups query---");
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<Group> groups = groupService.selectGroups();
		map.put("data", groups);
		
		return map;
	}
	
	@RequestMapping(value="/detail/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  detail(@PathVariable(value="id") Integer id){
		System.out.println("----group query by id---");
		
		Map<String, Object> map = new HashMap<String, Object>();
		Group group = groupService.selectById(id);
		map.put("data", group);
		return map;
	}
	
	@RequestMapping(value="/member/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  member(@PathVariable(value="id") Integer id){
		System.out.println("----group member query by id---");
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<User> users = groupService.selectUsersByGroupID(id);
		List<Map<String,Object>> userMaps = new ArrayList<Map<String,Object>>();
		for(User u : users){
			Map<String,Object> userMap = new HashMap<String,Object>();
			userMap.put("id", u.getId());
			userMap.put("name", u.getUsername());
			userMaps.add(userMap);
		}
		map.put("users", userMaps);
		map.put("data", users);
		return map;
	}
	
	
	@RequestMapping(value="/delete/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  delete(@PathVariable(value="id") Integer id){
		System.out.println("----group delete---");
		System.out.println("delete id:" + id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		groupService.delete(id);
		map.put("flag", "success");	
		return map;
	}

	@RequestMapping(value="/deleteIds",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  deleteIds(@RequestBody List<Integer> ids){
		System.out.println("----groups multi delete---");
		System.out.println("delete id:" + ids);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		for(int id : ids){
			groupService.delete(id);
		}	
		map.put("flag", "success");	
		
		return map;
	}
	
	@RequestMapping(value="/removeUser",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  remove(@RequestBody Map<String,Integer> mapReq){
		int uid  = mapReq.get("userid");
		int gid = mapReq.get("groupid");
		System.out.println("----remove group member---");
		System.out.println("delete id:" + uid + ", from group id:"+gid);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		groupService.deleteUserFromGroup(gid, uid);
		map.put("flag", "success");	
		return map;
	}
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  add(@RequestBody Group  group){
		
		System.out.println("----group add------");
		System.out.println("received group:"+group);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			groupService.add(group);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		
		return map;
	}
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody Group  group){
		
		System.out.println("----group update------");
		System.out.println("update groupid :"+group.getId());
		System.out.println("received group:"+group);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			groupService.update(group);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		return map;
	}
	
	
}
