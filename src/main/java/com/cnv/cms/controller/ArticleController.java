package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.authority.AuthClass;
import com.cnv.cms.authority.AuthMethod;
import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.Article;
import com.cnv.cms.model.User;
import com.cnv.cms.service.ArticleService;
import com.cnv.cms.service.AttachmentService;

@AuthClass
@Controller
@RequestMapping("/api/article")
public class ArticleController {
	
	@Autowired
	 @Qualifier("articleServiceImpl")
	private ArticleService articleService;
	
	@Autowired
	@Qualifier("attachServiceImpl")
	private AttachmentService attachService;
	
	@AuthMethod(role="base")
	@RequestMapping(value="/add/{clientid}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  add(@PathVariable String clientid,
			@RequestBody Article article, HttpSession httpSession){
		Map<String, Object> map = new HashMap<String, Object>();
		
		User loginUser = (User) httpSession.getAttribute("loginUser"); 
		article.setUserId(loginUser.getId());
		
        if(CmsConfig.isDebug()){
        	System.out.println("-------article add---------");  
        	System.out.println("received article:"+article);
        	System.out.println("client id:"+clientid);

        }
		
		if(!articleService.add(article, clientid)){
			map.put("flag", "添加文章失败！");
		}
		map.put("flag", "success");
		return map;
	}
	
	@AuthMethod(role="base")
	@RequestMapping(value="/delete/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  delete(@PathVariable int id){
		Map<String, Object> map = new HashMap<String, Object>();
		if(!articleService.delete(id)){
			map.put("flag", "文章删除失败！");
		}
		map.put("flag", "success");
		return map;
	}
	
	@AuthMethod(role="base")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody Article article){
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(!articleService.update(article)){
				map.put("flag", "添加文章失败");
			}
		} catch (CmsException ce) {
			map.put("flag", ce.getMessage());
		}
		catch (Exception ce) {
			ce.printStackTrace();
			map.put("flag", "添加文章失败");
		}
		map.put("flag", "success");
		return map;
	}
	
	@AuthMethod(role="customer")
	@RequestMapping(value="/detail/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  detail(@PathVariable int id){
		Map<String, Object> map = new HashMap<String, Object>();
		Article a=null;
		try {
			a = articleService.selectById(id);
			articleService.addReadTimes(id, 1);
			Map<String, String> mapUrl = attachService.selectPicUrlByArticleId(id);
			map.put("data", a);
			map.put("imgUrl", mapUrl);
		} catch (CmsException ce) {
			map.put("flag", ce.getMessage());
		}
		
		map.put("flag", "success");
		return map;
	}
	@AuthMethod(role="customer")
	@RequestMapping(value="/channel/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  articlesInColumn(@PathVariable int id){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			List<Article> articles = articleService.selectByChannel(id);
			map.put("data", articles);
		} catch (CmsException ce) {
			map.put("flag", ce.getMessage());
		}
		
		map.put("flag", "success");
		return map;
	}
	
	@AuthMethod(role="customer")
	@RequestMapping(value="/topread/{n}/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  topRead(@PathVariable int n,@PathVariable int id){
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			List<Article> articles = null;
			if(id<0){
				articles = articleService.selectTopRead(n);
			}else{
				articles = articleService.selectTopRead(n,id);
			}
			map.put("data", articles);
		} catch (CmsException ce) {
			map.put("flag", ce.getMessage());
		}
		
		map.put("flag", "success");
		return map;
	}
	@AuthMethod(role="customer")
	@RequestMapping(value="/topread/{n}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  topRead(@PathVariable int n){
		return this.topRead(n,-1);
		
	}
}
