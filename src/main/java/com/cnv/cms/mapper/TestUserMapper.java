package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.User;

public interface TestUserMapper {
	
	void addUser(User user);
	List<User> selectUsers(String username);
	void updateUser(User user);
	void deleteUser(int id);
	void deleteUserLargerByID(int id);
	
}
