package com.cnv.cms.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.GroupMapper;
import com.cnv.cms.mapper.RoleMapper;
import com.cnv.cms.mapper.UserGroupMapper;
import com.cnv.cms.mapper.UserMapper;
import com.cnv.cms.mapper.UserRoleMapper;
import com.cnv.cms.model.Group;
import com.cnv.cms.model.Pager;
import com.cnv.cms.model.Role;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserGroup;
import com.cnv.cms.model.UserRole;
import com.cnv.cms.service.UserService;

@Component
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private UserGroupMapper userGroupMapper;
	@Autowired
	private UserRoleMapper userRoleMapper;
	@Autowired
	private RoleMapper roleMapper;
	@Autowired
	private GroupMapper groupMapper;

	public void add(User user, Integer[] rids, Integer[] gids) {
		//检查用户是否存在
		User utemp = userMapper.selectUserByName(user.getUsername());
		if(utemp==null){
			//此处应该抛出异常
			throw new CmsException("该用户已经存在");
		}
		try {
			userMapper.addUser(user);
		}catch(Exception e){
			throw new CmsException("用户添加失败");
		}
		//添加角色
		for(int rid:rids){
			//1.检查角色是否存在
			Role role = roleMapper.selectRole(rid);
			if(role==null)	throw new CmsException("添加的角色不存在");
			userRoleMapper.add(new UserRole(user.getId(),rid));
		}
		//添加组别
		for(int gid:gids){
			//检查组别是否存在
			Group group  = groupMapper.selectGroup(gid);
			if(group==null) throw new CmsException("添加的组别不存在");
			userGroupMapper.add(new UserGroup(user.getId(),gid));
		}
		
	}

	public void delete(int id) {
		//是否有文章
		userMapper.deleteUser(id);
		userRoleMapper.deleteByUID(id);
		userGroupMapper.deleteByUID(id);
	}

	public void update(User user, Integer[] rids, Integer[] gids) {
		// TODO Auto-generated method stub

	}

	public void update(User user) {
		userMapper.updateUser(user);
	}

	public void updatePwd(int uid, String oldPwd, String newPwd) {
		User user = userMapper.selectUserByID(uid);
		if(!oldPwd.equals(user.getPassword())){
			//此处应该抛出异常
			throw new CmsException("原密码不正确");
		}
		user.setPassword(newPwd);
		userMapper.updateUser(user);
	}

	public void updateStatus(int id) {
		User user = userMapper.selectUserByID(id);
		if(user==null){
			//此处抛出异常
			throw new CmsException("用户不存在");
		}
		user.setStatus(1-user.getStatus());
		userMapper.updateUser(user);
	}

	public Pager<User> findUser() {
		// TODO Auto-generated method stub
		return null;
	}

	public User load(int id) {
		return userMapper.selectUserByID(id);
	}

	public List<Role> listUserRoles(int id) {
		List<Role> roles = userRoleMapper.selectRolesByUserID(id);
		return roles;
	}

	public List<Group> listUserGroups(int id) {
		List<Group> groups = userGroupMapper.selectGroupsByUserID(id);
		return groups;
	}

	public List<Integer> listUserRoleIds(int id) {
		List<Role> roles = this.listUserRoles(id);
		List<Integer> rids = new ArrayList<Integer>();
		for(Role role:roles){
			rids.add(role.getId());
		}
		return rids;
	}

	public List<Integer> listUserGroupIds(int id) {
		List<Group> groups = this.listUserGroups(id);
		List<Integer> gids = new ArrayList<Integer>();
		for(Group group:groups){
			gids.add(group.getId());
		}
		return gids;
	}

	public List<User> listGroupUsers(int gid) {
		List<User> users = userGroupMapper.selectUsersByGroupID(gid);
		return users;
	}

	public List<User> listRoleUsers(int rid) {
		List<User> users = userRoleMapper.selectUsersByRoleID(rid);
		return users;
	}

	public User login(String username, String password) {
		// TODO Auto-generated method stub
		//
		List<User> users = userRoleMapper.selectUsersByRoleID(1);
		return null;
	}

}
