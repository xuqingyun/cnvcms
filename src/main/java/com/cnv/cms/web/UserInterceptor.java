package com.cnv.cms.web;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.User;

/*
 *Adminl目录静态资源拦截
 */
public class UserInterceptor extends HandlerInterceptorAdapter {
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		String url = request.getRequestURI();
		if(CmsConfig.isDebug()){
			System.out.println("------User Home Interceptor: "+url);
		}
		

		User user = (User)session.getAttribute("loginUser");
		if(user==null) {
			//System.out.println("Redirect:"+request.getContextPath()+"/admin/login.html");
			//如果未登录就跳转到登录页面
			response.sendRedirect(request.getContextPath()+"/login.html");
			//response.sendError(403, "无权访问");
			return false;
		} 
			
	
		//System.out.println(request.getRequestURL());
		return super.preHandle(request, response, handler);
		
				
	}
}
