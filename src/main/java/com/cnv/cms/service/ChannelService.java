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
public interface ChannelService extends BaseService<Channel>{


	/**
	 * 删除子栏目，注意需要把栏目内的文章删除
	 * @param id
	 */
	public void deleteByParentId(int id);


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

}
