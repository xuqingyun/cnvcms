package com.cnv.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/api")
public class TestController {
	@RequestMapping(value="/a",method=RequestMethod.GET)
	public String test1(Model model){
		//System.out.println("mapping.........");
		return "index";
	}
}
