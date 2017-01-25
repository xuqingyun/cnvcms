/**
 * 
 */
package com.cnv.cms.service;

import java.util.List;

import com.cnv.cms.model.Role;
import com.cnv.cms.model.UserRole;

/**
 * @author Administrator
 *
 */
public interface RoleService extends BaseService<Role>{
	/**
	 * 添加Group
	 * @param Group
	 */
	public void add(Role role);
	/**
	 * 添加UserGroup
	 * @param UserGroup
	 */
	public void add(UserRole userRole);
	/**
	 * 删除组，注意需要把用户和角色和组的对应关系删除
	 * @param id
	 */
	public void delete(int id);
	/**
	 * 删除组，注意需要把用户和角色和组的对应关系删除
	 * @param id
	 */
	public void deleteUserRole(int id);
	/**
	 * Group更新
	 * @param group
	 */
	public void update(Role role);
	/**
	 * UserGroup更新
	 * @param userGroup
	 */
	public void update(UserRole userRole);
	

	/*
	 * 用户列表
	 */
	public List<Role> selectRoles();
	/**
	 * 获取Group信息
	 * @param id
	 */
	public Role selectById(int id);


}
