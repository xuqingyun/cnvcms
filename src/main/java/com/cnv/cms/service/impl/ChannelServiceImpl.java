package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.ChannelMapper;
import com.cnv.cms.model.Channel;
import com.cnv.cms.service.ChannelService;

@Service("channelServiceImpl")  
public class ChannelServiceImpl implements ChannelService {
	@Autowired
	private ChannelMapper channelMapper;
	
	/**
	 * 添加Channel，注意id和orders需要先查询最大值，然后赋值
	 * @param Channel
	 */
	public void add(Channel channel) {
		
		Channel c = channelMapper.selectByName(channel.getName());
		if(c != null){
			throw new CmsException("栏目名称已经存在");
		}
		if(channel.getParentId() != -1){
			c = channelMapper.selectById(channel.getParentId());
			if(c == null){
				throw new CmsException("父栏目不存在");
			}
		}
				
		
		Integer maxId = channelMapper.maxId();
		int id = (maxId == null) ? 1 : maxId+1;
		channel.setId(id);
		
		Integer maxOrder;
		if(channel.getParentId() == -1){
			maxOrder = channelMapper.maxOrder();
		}else{
			maxOrder = channelMapper.subChannelMaxOrder(channel.getParentId());
		}
		int order = (maxOrder == null) ? 1 : maxOrder+1;
		channel.setOrders(order);
		
		try{
			channelMapper.add(channel);
		}catch(Exception e){
			e.printStackTrace();
			throw new CmsException("栏目添加失败：\n"+e.toString());
		}
	}

	/**
	 * 删除栏目，注意需要把栏目内的文章删除
	 * @param id
	 */
	public void delete(int id) {
		// TODO 查询栏目内是否存在文章，否则不能删除
		
		if(channelMapper.selectByParentId(id).size() > 0){
			throw new CmsException("存在子栏目,无法删除!\n");
		}
		try{
			channelMapper.delete(id);
		}catch(Exception e){
			e.printStackTrace();
			if(channelMapper.selectById(id) != null){
				throw new CmsException("栏目删除失败：\n"+e.toString());
			}
		}
	}

	public void deleteByParentId(int id) {
		// TODO 查询栏目内是否存在文章，否则不能删除
		try{
			channelMapper.deleteByParentId(id);
		}catch(Exception e){
			e.printStackTrace();
			if(channelMapper.selectByParentId(id).size() == 0){
				throw new CmsException("栏目删除失败：\n"+e.toString());
			}
		}
	}

	/**
	 * Channel更新
	 * @param channel
	 */
	public void update(Channel channel) {
		try{
			channelMapper.update(channel);
		}catch(Exception e){
			e.printStackTrace();
			throw new CmsException("栏目更新失败：\n"+e.toString());
		}
	}

	public List<Channel> selectAll() {
		return channelMapper.selectAll();
	}

	public List<Channel> selectTopChannels() {
		return channelMapper.selectByParentId(-1);
	}

	public List<Channel> selectSubChannels(int parentId) {
		return channelMapper.selectByParentId(parentId);
	}

	/**
	 * 获取Channel信息
	 * @param id
	 */
	public Channel selectById(int id) {
		return channelMapper.selectById(id);
	}

}
