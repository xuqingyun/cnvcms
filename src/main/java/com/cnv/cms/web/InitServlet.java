package com.cnv.cms.web;

import java.util.Map;
import java.util.Set;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.cnv.cms.authority.AuthUtil;

/**
 * @author Administrator
 *
 * @description 系统启动时初始化权限列表
 *
 */
public class InitServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static WebApplicationContext wc;
	
	/* 
	 * 读取控制器方法上的注解信息
	 */
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		//初始化spring的工厂
		wc = WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());
		//初始化权限信息
		Map<String,Set<String>> auths = AuthUtil.initAuth("com.cnv.cms.controller");
		this.getServletContext().setAttribute("allAuths", auths);
		//this.getServletContext().setAttribute("baseInfo", BaseInfoUtil.getInstacne().read());
		System.out.println("------------------------系统初始化成功:-----------------------------\n"+auths);
	}
	
	public static WebApplicationContext getWc() {
		return wc;
	}

}
