package com.cnv.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.model.Channel;
import com.cnv.cms.service.ChannelService;

@Controller
@RequestMapping("/api/channel")
public class ChannelController {
	@Autowired
	@Qualifier("channelServiceImpl")
	private ChannelService channelService;
	
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
			System.out.println("-- parent id: "+id);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<Channel> channels = channelService.selectSubChannels(id);
		map.put("data", channels);
	
		
		return map;
	}		
}
