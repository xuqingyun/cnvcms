package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Channel;

public interface ChannelMapper {
	/*
	 * 添加栏目
	 */
	void add(Channel channel);
	/*
	 * 根据id选择栏目
	 */
	Channel selectById(int id);
	/*
	 * 根据栏目名查询栏目
	 */
	Channel selectByName(String name);
	/*
	 * 查询子栏目
	 */
	List<Channel> selectByParentId(int id);
	/*
	 * 查询所有栏目
	 */
	List<Channel> selectAll();
	/*
	 * 更新栏目
	 */
	void update(Channel channel);
	/*
	 * 删除栏目
	 */
	void delete(int id);
	/*
	 * 删除子栏目
	 */
	void deleteByParentId(int id);
	/*
	 * 获取数据库中的最大id
	 */
	Integer maxId();
	/*
	 * 获取根栏目的最大顺序
	 */
	Integer maxOrder();
	/*
	 * 获取子栏目的最大顺序
	 */
	Integer subChannelMaxOrder(int id);
	
}
