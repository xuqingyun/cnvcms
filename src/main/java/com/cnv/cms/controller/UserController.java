package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.User;
import com.cnv.cms.service.UserService;

@Controller
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	 @Qualifier("userServiceImpl")
	private UserService userService;
	
	
	@RequestMapping(value="/users",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  users(){
		System.out.println("----users query---");
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<User> users = userService.listUsers();
		map.put("users", users);
	
		
		return map;
	}
	
	@RequestMapping(value="/detail/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  detail(@PathVariable(value="id") Integer id){
		System.out.println("----users query---");
		Map<String, Object> map = new HashMap<String, Object>();
		
		User user = userService.load(id);
		List<Integer> gids = userService.listUserGroupIds(id);
		List<Integer> rids = userService.listUserRoleIds(id);
		map.put("user", user);
		map.put("groupids", gids);
		map.put("roleids", rids);
	
		
		return map;
	}
	
	@RequestMapping(value="/delete/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  deleter(@PathVariable(value="id") Integer id){
		System.out.println("----users delete---");
		System.out.println("delete id:" + id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		userService.delete(id);
		map.put("flag", "success");	
		
		return map;
	}
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  add(@RequestBody User  userForm){
		
		System.out.println("----user add------");
		System.out.println("received userform:"+userForm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			userService.add(userForm,userForm.getRoleIDs(),userForm.getGroupIDs());
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		
		return map;
	}
	
	@RequestMapping(value="/update/{id}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody User  userForm,
			@PathVariable(value="id") Integer id){
		List<Integer> gids = userForm.getGroupIDs();
		List<Integer> rids = userForm.getRoleIDs();
		
		System.out.println("----user update------");
		System.out.println("update userid :"+id);
		System.out.println("received userform:"+userForm);
		System.out.println("received gids:"+gids+"\treceived rids:"+rids);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			userService.update(userForm,rids,gids);
			map.put("flag", "success");	
		}catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		
		return map;
	}
	

	@RequestMapping(value="/usergroup/update/{id}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  updateUserGroup(@RequestBody Map<String, List<Integer>> mapIDs,
			@PathVariable(value="id") Integer id){
		List<Integer> gids = mapIDs.get("gids");
		List<Integer> rids = mapIDs.get("rids");
		
		System.out.println("----user group update------");
		System.out.println("update userid :"+id);
		System.out.println("received gids:"+gids+"\treceived gids:"+rids);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			userService.update(id, rids, gids);
			map.put("flag", "success");	
		}catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		return map;
	}
	
	@RequestMapping(value="/update/",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody User  userForm){
		
		System.out.println("----user update------");
		System.out.println("update userid :"+ userForm.getId());
		System.out.println("received userform:"+userForm);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			userService.update(userForm);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		
		return map;
	}
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  login(@RequestBody User  userForm){
		
		System.out.println("user/login--------------received userform:");
		System.out.println(userForm);
		Map<String, Object> map = new HashMap<String, Object>();
		
		try{
			User user = userService.login(userForm.getUsername(), userForm.getPassword());
			//httpSession.setAttribute("loginUser", user.getUsername()); 
			map.put("login", "success");
		}
		catch(CmsException ce){
			map.put("login", "failure");
			map.put("loginError", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
			
		}		
		
		return map;
	}
	
	@RequestMapping(value="/testpost",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  post(@RequestBody User  userForm){
		
		System.out.println("test post--------------received userform:");
		System.out.println(userForm);
		Map<String, Object> map = new HashMap<String, Object>();
		
		try{
			User user = userService.login(userForm.getUsername(), userForm.getPassword());
			//httpSession.setAttribute("loginUser", user.getUsername()); 
			map.put("login", "success");
		}
		catch(CmsException ce){
			map.put("login", "failure");
			map.put("loginError", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
			
		}	

		
		return map;
	}
}
