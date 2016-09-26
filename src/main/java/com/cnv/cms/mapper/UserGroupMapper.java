package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Group;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserGroup;

public interface UserGroupMapper {
	void add(UserGroup userGroup);
	void delete(int id);
	void deleteByUID(int id);
	void update(UserGroup userGroup);
	UserGroup selectByID(int id);
	List<UserGroup> selectByUID(int id);
	List<UserGroup> selectByGID(int id);
	List<UserGroup> selectAll();
	
	List<Group> selectGroupsByUserID(int id);
	List<User> selectUsersByGroupID(int gid);
	
}