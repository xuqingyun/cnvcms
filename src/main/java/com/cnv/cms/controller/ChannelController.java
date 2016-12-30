package com.cnv.cms.controller;

import java.util.ArrayList;
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

import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.exception.CmsException;
import com.cnv.cms.model.Channel;
import com.cnv.cms.model.ChannelType;
import com.cnv.cms.model.Group;
import com.cnv.cms.service.ChannelService;

@Controller
@RequestMapping("/api/channel")
public class ChannelController {
	@Autowired
	@Qualifier("channelServiceImpl")
	private ChannelService channelService;
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  add(@RequestBody Channel  channel){
		if(CmsConfig.isDebug){
			System.out.println("----channel add------");
			System.out.println("received channel:"+channel);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			channelService.add(channel);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		return map;
	}
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  update(@RequestBody Channel  channel){
		if(CmsConfig.isDebug){
			System.out.println("----channel update------");
			System.out.println("   received channel:"+channel);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			channelService.update(channel);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		return map;
	}
	
	@RequestMapping(value="/detail/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  detail(@PathVariable("id") int id){
		if(CmsConfig.isDebug){
			System.out.println("----channel query---");
			System.out.println("    id:"+id);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		Channel channel = channelService.selectById(id);
		map.put("data", channel);
	
		
		return map;
	}
	
	@RequestMapping(value="/channels",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  channels(){
		if(CmsConfig.isDebug){
			System.out.println("----channels query---");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Channel> channels = channelService.selectAll();
		map.put("data", channels);
	
		
		return map;
	}
	
	@RequestMapping(value="/topChannels",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  topChannels(){
		if(CmsConfig.isDebug){
			System.out.println("---- top channels query---");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Channel> channels = channelService.selectTopChannels();
		map.put("data", channels);
	
		
		return map;
	}	
	
	@RequestMapping(value="/subChannels/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  subChannels(@PathVariable("id") int id){
		if(CmsConfig.isDebug){
			System.out.println("---- sub channels query---");
			System.out.println("     parent id: "+id);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Channel> channels = channelService.selectSubChannels(id);
		map.put("data", channels);
	
		
		return map;
	}	
	
	@RequestMapping(value="/channelTypes",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  channelTypes(){
		if(CmsConfig.isDebug){
			System.out.println("---- channel types query---");
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		ChannelType[] channelTypes = ChannelType.values();
		List<String> ctstr = new ArrayList<String>();
		for(ChannelType ct:channelTypes){
			ctstr.add(ct.getName());
		}
//		List<Channel> channels = channelService.selectTopChannels();
		map.put("data", ctstr);
	
		
		return map;
	}
	
	@RequestMapping(value="/delete/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  delete(@PathVariable("id") int id){
		if(CmsConfig.isDebug){
			System.out.println("---- channel delete---");
			System.out.println("   delete id:" + id);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("flag", "failure");	
		try{
			channelService.deleteById(id);
			map.put("flag", "success");	
		}
		catch(CmsException ce){
			map.put("flag", ce.getMessage());
			System.out.println("cms error:"+ce.getMessage());
		}	
		
		return map;
	}	
	
}
