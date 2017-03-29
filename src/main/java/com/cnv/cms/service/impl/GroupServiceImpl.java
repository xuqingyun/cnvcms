package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.GroupMapper;
import com.cnv.cms.mapper.UserGroupMapper;
import com.cnv.cms.model.Group;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserGroup;
import com.cnv.cms.service.GroupService;

@Service("groupServiceImpl")  
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupMapper groupMapper;
	@Autowired
	private UserGroupMapper userGroupMapper;
	
	@Autowired
	DataSourceTransactionManager txManager;
	
	public boolean add(Group g) {
		if(g.getName() == null | g.getName() == ""){
			throw new CmsException("用户名不能为空!");
		}		
		Group group = groupMapper.selectGroupByName(g.getName());
		if(group != null){
			throw new CmsException("该组名已经存在");
		}
		groupMapper.addGroup(g);
		return true;
	}
	
	public void add(UserGroup ug) {
		Integer id = userGroupMapper.maxId();
		if(id==null) id=0;
		ug.setId(id+1);
		userGroupMapper.add(ug);		
	}

	public boolean delete(int id) {
		groupMapper.deleteGroup(id);
		userGroupMapper.deleteByGID(id);	
		return true;
	}
	public void deleteUserGroup(int id) {
		userGroupMapper.delete(id);	
	}
	
	public boolean update(Group g) {
		Group group = groupMapper.selectGroup(g.getId());
		if(group == null){
			throw new CmsException("Group不存在！");
		}
		groupMapper.updateGroup(g);
		return true;
	}
	
	public void update(UserGroup ug) {
		userGroupMapper.update(ug);
	}


	public List<Group> selectGroups() {
		return groupMapper.selectAllGroups();
	}

	public Group selectById(int id) {
		return groupMapper.selectGroup(id);
	}

	public List<User> selectUsersByGroupID(int id) {
		return userGroupMapper.selectUsersByGroupID(id);
	}

	public void deleteUserFromGroup(int gid, int uid) {
		userGroupMapper.deleteUserGroup(uid, gid);
	}







	

}
