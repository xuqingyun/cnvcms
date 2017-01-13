package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.authority.AuthClass;
import com.cnv.cms.authority.AuthMethod;
import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.Role;
import com.cnv.cms.model.RoleType;
import com.cnv.cms.model.User;
import com.cnv.cms.service.UserService;

@AuthClass
@Controller
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
	 @Qualifier("userServiceImpl")
	private UserService userService;
	
	@AuthMethod(role="customer")
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public  @ResponseBody Map<String, String>  loginIn(@RequestBody User  userForm,
			HttpSession httpSession, HttpServletRequest req){
		System.out.println("received userform:");
		System.out.println(userForm);
		Map<String, String> map = new HashMap<String, String>();
		
		try{
			User user = userService.login(userForm.getUsername(), userForm.getPassword());
			httpSession.setAttribute("loginUser", user); 
			List<Role> roles =  userService.listUserRoles(user.getId());
			boolean isAdmin = isRole(roles,RoleType.ROLE_ADMIN);
		
			httpSession.setAttribute("isAdmin", isAdmin);
			map.put("login", "success");
			if(isAdmin){
				map.put("url", req.getContextPath()+"/admin/index.html");
			}else{
				map.put("url", req.getContextPath()+"/user/home.html");
			}
			
		}catch(CmsException ce){
			map.put("login", "failure");
			map.put("error", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
			
		}			
		return map;
	}
	
	@AuthMethod()
	@RequestMapping(value="/login.check",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  loginCheck(HttpSession httpSession){
		System.out.println("login get");
		Map<String, Object> map = new HashMap<String, Object>();
		
		//httpSession.setAttribute("loginUser", user.getUsername()); 
		User loginUser = (User) httpSession.getAttribute("loginUser");
		System.out.println("login user: "+loginUser);
		if(loginUser == null){
			map.put("login", "failure");
		}else{
			map.put("login", "success");
		}	
		
		return map;
	}
	
	
	@AuthMethod()
	@RequestMapping(value="/login.out",method=RequestMethod.GET)
	public  String  loginOut(HttpSession httpSession){
		httpSession.removeAttribute("loginUser");
		System.out.println("login out");
		return "redirect:/login.html";
	}
	
	
	private boolean isRole(List<Role> rs,RoleType rt) {
		for(Role r:rs) {
			if(r.getRoleType()==rt) return true;
		}
		return false;
	}
}
