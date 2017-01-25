package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnv.cms.mapper.RoleMapper;
import com.cnv.cms.mapper.UserRoleMapper;
import com.cnv.cms.model.Role;
import com.cnv.cms.model.UserRole;
import com.cnv.cms.service.RoleService;

@Service("roleServiceImpl")
public class RoleServiceImpl implements RoleService {

	@Autowired
	private UserRoleMapper userRoleMapper;
	@Autowired
	private RoleMapper roleMapper;
	
	public void add(Role role) {
		roleMapper.addRole(role);
	}

	public void add(UserRole userRole) {
		userRoleMapper.add(userRole);
	}

	public void delete(int id) {
		roleMapper.deleteRole(id);
		userRoleMapper.deleteByUID(id);
	}

	public void deleteUserRole(int id) {
		userRoleMapper.delete(id);
	}

	public void update(Role role) {
		roleMapper.updateRole(role);
	}

	public void update(UserRole userRole) {
		userRoleMapper.update(userRole);
	}

	public List<Role> selectRoles() {
		return roleMapper.selectAllRoles();
	}

	public Role selectById(int id) {
		return roleMapper.selectRole(id);
	}

}
