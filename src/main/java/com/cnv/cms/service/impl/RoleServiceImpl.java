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
	
	public boolean add(Role role) {
		try {
			roleMapper.addRole(role);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public void add(UserRole userRole) {
		userRoleMapper.add(userRole);
	}

	public boolean delete(int id) {
		try {
			roleMapper.deleteRole(id);
			userRoleMapper.deleteByUID(id);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public void deleteUserRole(int id) {
		userRoleMapper.delete(id);
	}

	public boolean update(Role role) {
		try {
			roleMapper.updateRole(role);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
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
