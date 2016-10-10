package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.User;
import com.cnv.cms.service.UserService;

@Controller
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
	 @Qualifier("userServiceImpl")
	private UserService userService;
	
	
	//@RequestParam(value = "username") String username,
	//@RequestParam(value = "password") String password,
	@RequestMapping(value="/login.json",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  login(@RequestBody User  userForm,
			HttpSession httpSession){
		System.out.println("received userform:");
		System.out.println(userForm);
		Map<String, Object> map = new HashMap<String, Object>();
		
		try{
			User user = userService.login(userForm.getUsername(), userForm.getPassword());
			httpSession.setAttribute("loginUser", user.getUsername()); 
			map.put("login", "success");
		}
		catch(CmsException ce){
			map.put("login", "failure");
			map.put("loginError", ce.getMessage());
		}		
		
		return map;
	}
	@RequestMapping(value="/login.json",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  login(HttpSession httpSession){
		System.out.println("login get");
		Map<String, Object> map = new HashMap<String, Object>();
		
			
		//httpSession.setAttribute("loginUser", user.getUsername()); 
		String loginUser = (String) httpSession.getAttribute("loginUser");
		System.out.println("login user: "+loginUser);
		if(loginUser == null){
			map.put("login", "failure");
		}else{
			map.put("login", "success");
		}	
		
		return map;
	}
	@RequestMapping(value="/login.out",method=RequestMethod.GET)
	public  String  loginOut(HttpSession httpSession){
		httpSession.removeAttribute("loginUser");
		System.out.println("login out");
		return "redirect:/admin/login.html";
	}
}
