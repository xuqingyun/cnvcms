package com.cnv.cms.inject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cnv.cms.mapper.TestUserMapper;
import com.cnv.cms.model.User;

@Component
public class TestInject {
	@Autowired
	private   TestUserMapper userMapper;
	
	public void testUserMapper(){
		//userMapper.deleteUser(5);
		List<User> users = userMapper.selectUsers("%");
		System.out.println("------test selectUsers-------");
		for(User user : users){
			System.out.println(user);
		}	
	}
}
