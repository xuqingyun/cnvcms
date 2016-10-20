package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.GroupMapper;
import com.cnv.cms.mapper.UserGroupMapper;
import com.cnv.cms.model.Group;
import com.cnv.cms.model.UserGroup;
import com.cnv.cms.service.GroupService;

@Service("groupServiceImpl")  
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupMapper groupMapper;
	@Autowired
	private UserGroupMapper userGroupMapper;
	
	public void add(Group g) {
		Group group = groupMapper.selectGroupByName(g.getName());
		if(group != null){
			throw new CmsException("该组名已经存在");
		}
		groupMapper.addGroup(g);
	}
	
	public void add(UserGroup ug) {
		userGroupMapper.add(ug);		
	}

	public void deleteGroup(int id) {
		groupMapper.deleteGroup(id);
		userGroupMapper.deleteByGID(id);		
	}
	
	public void deleteUserGroup(int id) {
		userGroupMapper.delete(id);		
	}
	
	public void update(Group g) {
		Group group = groupMapper.selectGroup(g.getId());
		if(group == null){
			throw new CmsException("Group不存在！");
		}
		groupMapper.updateGroup(g);
	}
	
	public void update(UserGroup ug) {
		userGroupMapper.update(ug);
	}


	public List<Group> selectGroups() {
		return groupMapper.selectAllGroups();
	}

	public Group selectGroup(int id) {
		return groupMapper.selectGroup(id);
	}






	

}
