package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.Role;
import com.cnv.cms.service.RoleService;

@Controller
@RequestMapping("/api/role")
public class RoleController {
	@Autowired
	@Qualifier("roleServiceImpl")
	private RoleService roleService;

	
	@RequestMapping(value="/roles",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  roles(){
		System.out.println("----roles query---");
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<Role> roles = roleService.selectRoles();
		map.put("data", roles);
		
		return map;
	}
	
	@RequestMapping(value="/detail/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  detail(@PathVariable(value="id") Integer id){
		System.out.println("----Role query by id---");
		
		Map<String, Object> map = new HashMap<String, Object>();
		Role role = roleService.selectRole(id);
		map.put("role", role);
		return map;
	}
	
	@RequestMapping(value="/delete/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  deleter(@PathVariable(value="id") Integer id){
		System.out.println("----Role delete---");
		System.out.println("delete id:" + id);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		roleService.deleteRole(id);
		map.put("flag", "success");	
		return map;
	}
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  add(@RequestBody Role  role){
		
		System.out.println("----Role add------");
		System.out.println("received Role:"+role);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			roleService.add(role);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		
		return map;
	}
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody Role  role){
		
		System.out.println("----Role update------");
		System.out.println("update Roleid :"+ role.getId());
		System.out.println("received Role:"+role);
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			roleService.update(role);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		return map;
	}

}
