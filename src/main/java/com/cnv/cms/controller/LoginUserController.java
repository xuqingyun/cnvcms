package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.authority.AuthClass;
import com.cnv.cms.authority.AuthMethod;
import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.model.User;
import com.cnv.cms.service.UserService;

@AuthClass
@Controller
@RequestMapping("/api/loginuser")
public class LoginUserController {
	
	@Autowired
	 @Qualifier("userServiceImpl")
	private UserService userService;
	
	@AuthMethod
	@RequestMapping(value="/selfinfo",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  selfInfo(HttpSession httpSession){
		if(CmsConfig.isDebug){
			System.out.println("----user self info query---");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		User user = (User)httpSession.getAttribute("loginUser");
		List<Integer> gids = userService.listUserGroupIds(user.getId());
		List<Integer> rids = userService.listUserRoleIds(user.getId());
		map.put("user", user);
		map.put("groupids", gids);
		map.put("roleids", rids);
	
		
		return map;
	}
}
