/**
 * 
 */
package com.cnv.cms.mapper;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cnv.cms.config.RootConfig;
import com.cnv.cms.service.GroupService;
import com.cnv.cms.service.UserService;



public class RransationTest {
	
//	private   UserMapper userMapper;
	private  ApplicationContext context;
	
	@Before
	public void setUp(){
		//context = new ClassPathXmlApplicationContext("applicationContext.xml");
		context = new AnnotationConfigApplicationContext(RootConfig.class);
//		userMapper = context.getBean(UserMapper.class);	
		
	}
	
	@Test
	public void testTransaction(){
		System.out.println("******************testTransaction**************");

		
		UserService gs = context.getBean(UserService.class);	
		gs.delete(112);


	}
	
	@After
	public  void tearDwon(){
		//context.close();
	}
	
}
