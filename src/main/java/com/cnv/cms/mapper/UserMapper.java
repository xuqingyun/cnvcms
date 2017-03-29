package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Article;
import com.cnv.cms.model.User;

public interface UserMapper extends BaseMapper<User>{
	
	void addUser(User user);
	List<User> selectUsers(String username);
	User selectUserByID(int id);
	User selectUserByName(String username);
	void updateUser(User user);
	void deleteUser(int id);
	void deleteUserLargerByID(int id);
	
}
