package com.cnv.cms.controller;

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
		map.put("user", user);
	
		
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
			userService.add(userForm);
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
		
		System.out.println("----user update------");
		System.out.println("update userid :"+id);
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
}