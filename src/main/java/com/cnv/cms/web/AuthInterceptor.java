package com.cnv.cms.web;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.model.User;

public class AuthInterceptor extends HandlerInterceptorAdapter {
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		String url = request.getRequestURI();
		if(CmsConfig.isDebug){
			System.out.println("Api Interceptor: "+url);
		}
		
		//获取包含包名和类名的方法名全称
		HandlerMethod hm = (HandlerMethod)handler;
		String aname = hm.getBean().getClass().getName()+"."+hm.getMethod().getName();
		//获取不受限制的方法集合
		Map<String,Set<String>> auths = (Map<String, Set<String>>) session.getServletContext().getAttribute("allAuths");
		Set<String>  customAuths = auths.get("customer");
		//如果是customer方法，则跳过，允许访问
		if(!customAuths.contains(aname)){
			
			User user = (User)session.getAttribute("loginUser");
			
			if(user==null) {
				//System.out.println("Redirect:"+request.getContextPath()+"/admin/login.html");
				//response.sendRedirect(request.getContextPath()+"/admin/login.html");
				response.sendError(403, "无权访问");
				return false;
			} else {
				boolean isAdmin = (Boolean)session.getAttribute("isAdmin");
				if(!isAdmin) {
					//不是超级管理人员，就需要判断是否有权限访问某些功能
					Set<String> actions = (Set<String>)session.getAttribute("allActions");
					
					//TODO
					if(!actions.contains(aname)){
						System.out.println("没有权限访问该功能");
						//throw new CmsException("没有权限访问该功能");
					}
				}
			}
			
		}
	
		return super.preHandle(request, response, handler);
		
		
		
		/*
		 * 如果使用uploadify进行文件的上传，由于flash的bug问题，会产生一个新的session，此时验证失败
		 * 所以必须在此处获取一个原有的session，然后重置session信息
		 */
		//TODO
/*		String sid = request.getParameter("sid");
		if(sid!=null&&!"".equals(sid.trim())) {
			//当sid有值，就表示是通过uploadify上传文件，此时就应该获取原有的session
			session = CmsSessionContext.getSession(sid);
		}*/

	}
}
