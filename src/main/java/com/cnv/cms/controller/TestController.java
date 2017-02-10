package com.cnv.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.cnv.cms.config.CmsConfig;

@Controller
@RequestMapping("/aaa")
public class TestController {
	@RequestMapping(value="/*",method=RequestMethod.GET)
	public  void test1(Model model){
		System.out.println("controller testing.........");
		System.out.println("user:"+CmsConfig.getFtpUser());
		System.out.println("password:"+CmsConfig.getFtpPassword());
		//return "test";
	}
}
