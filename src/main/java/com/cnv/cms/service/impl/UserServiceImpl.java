package com.cnv.cms.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.cnv.cms.service.ArticleService;
import com.cnv.cms.service.UserService;

//@Component
@Service  
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
	
	@Autowired
	//@Qualifier("articleServiceImpl")
	private ArticleService articleService;
	
	
	@Transactional
	public void add(User user,List<Integer> rids, List<Integer> gids) {
		add(user);
		
		//添加角色
		if(rids.size()>0){
			for(int rid:rids){
				//1.检查角色是否存在并插入
				addRole(user,rid);
			}
		}

		//添加组别
		if(gids.size()>0){
			for(int gid:gids){
				//检查组别是否存在
				addGroup(user,gid);
			}
		}
		
		
	}
	@Transactional
	public boolean add(User user) throws CmsException{
		
		//检查用户是否存在
		User utemp = userMapper.selectUserByName(user.getUsername());
		if(utemp!=null){
			//此处应该抛出异常
			throw new CmsException("该用户已经存在");
		}
		try {
			Integer id = userMapper.maxId();
			if(id==null) id=0;
			user.setId(id+1);
			
			userMapper.add(user);
		}catch(Exception e){
			throw new CmsException("用户添加失败");
		}

		return true;
	}
	private void addRole(User user, int rid){
		Role role = roleMapper.selectRole(rid);
		if(role==null)	throw new CmsException("添加的角色不存在");
		userRoleMapper.add(new UserRole(user.getId(),rid));		
	}
	private void addGroup(User user, int gid){
		Group group  = groupMapper.selectGroup(gid);
		if(group==null) throw new CmsException("添加的组别不存在");
		userGroupMapper.add(new UserGroup(user.getId(),gid));	
	}
	
	@Transactional
	public boolean delete(int id) {
		try {
			userMapper.deleteUser(id);
			userRoleMapper.deleteByUID(id);
			userGroupMapper.deleteByUID(id);			
			articleService.deleteByUser(id);
		} catch (Exception e) {
			//e.printStackTrace();
			throw new CmsException("用户删除失败");
			//return false;
		}
		throw new CmsException("test 事务");
		//return true;
	}
	@Transactional
	public void update(User user, List<Integer> listRids, List<Integer> listGids) {
		User u = userMapper.selectUserByID(user.getId());
		if(u==null){
			//此处抛出异常
			throw new CmsException("用户不存在");
		}
		userMapper.updateUser(user);
		List<Integer> oldRids = userRoleMapper.selectRoleIDsByUserID(user.getId());
		List<Integer> oldGids = userGroupMapper.selectGroupIDsByUserID(user.getId());

		
		//如果原有的rid不存在，删除
		for(int oldRid:oldRids){
			if(!listRids.contains(oldRid)){
				userRoleMapper.deleteUserRole(user.getId(), oldRid);
			};
		}
		//如果新的的rid不存在，添加
		for(int rid:listRids){
			if(!oldRids.contains(rid)){
				addRole(user,rid);
			}
		}
		//如果原有的gid不存在，删除
		for(int oldGid:oldGids){
			if(!listGids.contains(oldGid)){
				userGroupMapper.deleteUserGroup(user.getId(), oldGid);
			};
		}
		//如果新的的gid不存在，添加
		for(int gid:listGids){
			if(!oldGids.contains(gid)){
				addGroup(user,gid);
			}
		}		
	}
	@Transactional
	public void update(int id, List<Integer> rids, List<Integer> gids) {
		User user = userMapper.selectUserByID(id);
		if(user==null){
			//此处抛出异常
			throw new CmsException("用户不存在");
		}
		List<Integer> oldRids = userRoleMapper.selectRoleIDsByUserID(id);
		List<Integer> oldGids = userGroupMapper.selectGroupIDsByUserID(id);
		List<Integer> listRids = rids;
		List<Integer> listGids = gids;
		
		//如果原有的rid不存在，删除
		for(int oldRid:oldRids){
			if(!listRids.contains(oldRid)){
				userRoleMapper.deleteUserRole(id, oldRid);
			};
		}
		//如果新的的rid不存在，添加
		for(int rid:listRids){
			if(!oldRids.contains(rid)){
				addRole(user,rid);
			}
		}
		//如果原有的gid不存在，删除
		for(int oldGid:oldGids){
			if(!listGids.contains(oldGid)){
				userGroupMapper.deleteUserGroup(id, oldGid);
			};
		}
		//如果新的的gid不存在，添加
		for(int gid:listGids){
			if(!oldGids.contains(gid)){
				addGroup(user,gid);
			}
		}
	}
	
	public boolean update(User user) {
		User u = userMapper.selectUserByID(user.getId());
		if(u==null){
			//此处抛出异常
			throw new CmsException("用户不存在");
		}
		userMapper.updateUser(user);
		return true;
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
		List<User> users = userMapper.selectUsers("%");
		Pager<User> userPager = new Pager<User>();
		userPager.setSize(15);
		userPager.setOffset(0);
		userPager.setTotal(users.size());
		return userPager;
	}
	public List<User> listUsers() {
		List<User> users = userMapper.selectUsers("%");
		return users;
	}
	public User selectById(int id) {
		User user = userMapper.selectUserByID(id);
		if(user==null){
			throw new CmsException("用户不存在");
		}
		user.setRoleIDs(this.listUserRoleIds(user.getId()));
		user.setGroupIDs(this.listUserGroupIds(user.getId()));
		return user;
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
		User user = userMapper.selectUserByName(username);
		if(user==null){
			throw new CmsException("用户不存在");
		}
		if(!password.equals(user.getPassword())){
			throw new CmsException("密码不正确");
		}
		user.setRoleIDs(this.listUserRoleIds(user.getId()));
		user.setGroupIDs(this.listUserGroupIds(user.getId()));
		return user;
	}
	public List<User> listUsersByGroupID(int id) {
		return userGroupMapper.selectUsersByGroupID(id);
	}
	public User load(String username) {
		User user = userMapper.selectUserByName(username);
		if(user==null){
			throw new CmsException("用户不存在");
		}
		return user;
	}

}
