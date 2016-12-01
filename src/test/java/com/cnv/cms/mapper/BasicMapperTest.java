/**
 * 
 */
package com.cnv.cms.mapper;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cnv.cms.model.Channel;
import com.cnv.cms.model.User;


//@Component
public class BasicMapperTest {
	
	//@Autowired
	private   TestUserMapper userMapper;
	private  ClassPathXmlApplicationContext context;
	

	@Before
	public void setUp(){
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		userMapper = context.getBean(TestUserMapper.class);		
	}
	
	@Test
	public void testUserMapper(){
		//userMapper.deleteUser(5);
		List<User> users = userMapper.selectUsers("%");
		System.out.println("------test selectUsers-------");
		for(User user : users){
			System.out.println(user);
		}
/*		TestInject testInject = context.getBean(TestInject.class);	
		testInject.testUserMapper();*/
	}
	@After
	public  void tearDwon(){
		context.close();
	}
	
}
