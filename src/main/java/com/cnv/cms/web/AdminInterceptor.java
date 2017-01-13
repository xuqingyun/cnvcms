package com.cnv.cms.web;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.User;

/*
 *Adminl目录静态资源拦截
 */
public class AdminInterceptor extends HandlerInterceptorAdapter {
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		String url = request.getRequestURI();
		System.out.println("Admin Interceptor: "+url);

		
		
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
		//TODO 只有login方法未登录可以访问
		if(url.equals(request.getContextPath()+"/admin/login.html") ){
			return super.preHandle(request, response, handler);
		}
		User user = (User)session.getAttribute("loginUser");
		if(user==null) {
			//System.out.println("Redirect:"+request.getContextPath()+"/admin/login.html");
			//如果未登录就跳转到登录页面
			response.sendRedirect(request.getContextPath()+"/login.html");
			//response.sendError(403, "无权访问");
			return false;
		} else {
			boolean isAdmin = (Boolean)session.getAttribute("isAdmin");
			if(!isAdmin) {
				System.out.println("没有权限访问该功能");
				response.sendRedirect(request.getContextPath()+"user/home.html");
				return false;
			}
		}
			
	
		//System.out.println(request.getRequestURL());
		return super.preHandle(request, response, handler);
		
				
	}
}
