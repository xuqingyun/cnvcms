package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Channel;
import com.cnv.cms.model.User;

public interface ChannelMapper {
	
	void add(Channel channel);
	Channel selectByName(String name);
	User selectByID(int id);
	void update(Channel channel);
	void delete(int id);
	int maxId();
	
}
