package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Channel;
import com.cnv.cms.model.User;

public interface ChannelMapper {
	
	void add(Channel channel);
	Channel selectById(int id);
	Channel selectByName(String name);
	List<Channel> selectByParentId(int id);
	List<Channel> selectAll();
	void update(Channel channel);
	void delete(int id);
	void deleteByParentId(int id);
	Integer maxId();
	Integer maxOrder();
	Integer subChannelMaxOrder(int id);
	
}
