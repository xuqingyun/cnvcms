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
 *Adminl目录静态资源拦截，只有管理员用户可以访问
 */
public class AdminInterceptor extends HandlerInterceptorAdapter {
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		String url = request.getRequestURI();
		if(CmsConfig.isDebug()){
			System.out.println("------Admin Interceptor: "+url);
		}
		
		
		//TODO 只有login方法未登录可以访问
		if(url.equals(request.getContextPath()+"/admin/login.html") ){
			return super.preHandle(request, response, handler);
		}
		User user = (User)session.getAttribute("loginUser");
		if(user==null) {
			//如果未登录就跳转到登录页面
			response.sendRedirect(request.getContextPath()+"/login.html");
			return false;
		} else {
			boolean isAdmin = (Boolean)session.getAttribute("isAdmin");
			if(!isAdmin) {
				if(CmsConfig.isDebug()){
					System.out.println("没有权限访问该功能");
				}
				response.sendRedirect(request.getContextPath()+"user/home.html");
				return false;
			}
		}
	
		return super.preHandle(request, response, handler);
		
				
	}
}
