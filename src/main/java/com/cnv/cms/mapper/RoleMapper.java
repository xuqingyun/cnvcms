package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Group;
import com.cnv.cms.model.Role;

public interface RoleMapper {
	void addRole(Role r);
	void deleteRole(int id);
	void updateRole(Role r);
	Role selectRole(int id);
	List<Role> selectAllRoles();
}
