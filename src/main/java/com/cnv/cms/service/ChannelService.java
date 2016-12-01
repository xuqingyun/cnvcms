/**
 * 
 */
package com.cnv.cms.service;

import java.util.List;

import com.cnv.cms.model.Channel;

/**
 * @author Administrator
 *
 */
public interface ChannelService {
	/**
	 * 添加Channel，注意id和orders需要先查询最大值，然后赋值
	 * @param Channel
	 */
	public void add(Channel channel);

	/**
	 * 删除栏目，注意需要把栏目内的文章删除
	 * @param id
	 */
	public void deleteById(int id);
	/**
	 * 删除子栏目，注意需要把栏目内的文章删除
	 * @param id
	 */
	public void deleteByParentId(int id);
	/**
	 * Channel更新
	 * @param channel
	 */
	public void update(Channel channel);

	/*
	 * 栏目列表
	 */
	public List<Channel> selectAll();
	/*
	 * 顶层栏目列表
	 */
	public List<Channel> selectTopChannels();
	/*
	 * 子栏目列表
	 */
	public List<Channel> selectSubChannels(int parentId);
	/**
	 * 获取Channel信息
	 * @param id
	 */
	public Channel selectById(int id);


}
