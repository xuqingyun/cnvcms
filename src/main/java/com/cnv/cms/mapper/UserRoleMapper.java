package com.cnv.cms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cnv.cms.model.Role;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserRole;

public interface UserRoleMapper {
	void add(UserRole userRole);
	void delete(int id);
	void deleteByUID(int id);
	void deleteByRID(int id);
	void deleteUserRole(@Param("uid") int uid,@Param("rid") int rid);
	void update(UserRole userRole);
	UserRole selectByID(int id);
	List<UserRole> selectByUID(int id);
	List<UserRole> selectByRID(int id);
	List<UserRole> selectAll();
	
	List<Role> selectRolesByUserID(int id);
	List<Integer> selectRoleIDsByUserID(int id);
	List<User> selectUsersByRoleID(int rid);
	
}
