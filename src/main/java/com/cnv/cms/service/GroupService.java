/**
 * 
 */
package com.cnv.cms.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.cnv.cms.model.Group;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserGroup;

/**
 * @author Administrator
 *
 */

public interface GroupService extends BaseService<Group>{
	/**
	 * 添加Group
	 * @param Group
	 * @return 
	 */
	@Transactional
	public boolean add(Group g);
	/**
	 * 添加UserGroup
	 * @param UserGroup
	 */
	@Transactional
	public void add(UserGroup ug);
	/**
	 * 删除组，注意需要把用户和角色和组的对应关系删除
	 * @param id
	 * @return 
	 */
	@Transactional
	public boolean delete(int id);
	/**
	 * 删除组，注意需要把用户和角色和组的对应关系删除
	 * @param id
	 */
	public void deleteUserGroup(int id);
	/**
	 * 删除用户和组的对应关系删除
	 * @param id
	 */
	public void deleteUserFromGroup(int gid,int uid);
	/**
	 * Group更新
	 * @param group
	 * @return 
	 */
	public boolean update(Group g);
	/**
	 * UserGroup更新
	 * @param userGroup
	 */
	public void update(UserGroup ug);
	

	/*
	 * Group列表
	 */
	public List<Group> selectGroups();
	/**
	 * 获取Group信息
	 * @param id
	 */
	public Group selectById(int id);
	
	/**
	 * 获取Group成员信息
	 * @param group id
	 */
	public List<User> selectUsersByGroupID(int id);



}
