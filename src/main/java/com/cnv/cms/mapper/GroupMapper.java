package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Group;

public interface GroupMapper {
	void addGroup(Group g);
	void deleteGroup(int id);
	void updateGroup(Group g);
	Group selectGroup(int id);
	List<Group> selectAllGroups();
}
