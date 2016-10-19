package com.cnv.cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cnv.cms.service.UserService;

@Controller
@RequestMapping("/api/group")
public class GroupController {
	@Autowired
	 @Qualifier("userServiceImpl")
	private UserService userService;
	
}
