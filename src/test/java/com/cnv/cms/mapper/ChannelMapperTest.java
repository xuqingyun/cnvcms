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


//@Component
public class ChannelMapperTest {
	
	//@Autowired
	
	private  ClassPathXmlApplicationContext context;
	

	@Before
	public void setUp(){
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
			
	}
	@Test
	public void testChannelMapper(){
		//userMapper.deleteUser(5);
		ChannelMapper channelMapper = context.getBean(ChannelMapper.class);
		List<Channel> channels = channelMapper.selectAll();
		System.out.println("------test selects-------");
		for(Channel user : channels){
			System.out.println(user);
		}
		Channel channel = new Channel();
		channel.setChannelType(2);
		channel.setCustomLink(0);
		channel.setId(channelMapper.maxId()+1);
		channel.setIsIndex(1);
		channel.setIsRecommend(0);
		channel.setIsTopNav(1);
		channel.setName("理财");
		channel.setOrders(1);
		channel.setParentId(2);
		channel.setStatus(1);
		channelMapper.add(channel);
		channels = channelMapper.selectAll();
		System.out.println("------test selects-------");
		for(Channel user : channels){
			System.out.println(user);
		}
		channelMapper.delete(channel.getId());
		//int ord = channelMapper.subChannelMaxOrder(5);
		System.out.println("------max id:-------" + channelMapper.subChannelMaxOrder(5));
		System.out.println("------sub channel:-------\n" + channelMapper.selectByParentId(5));
/*		TestInject testInject = context.getBean(TestInject.class);	
		testInject.testUserMapper();*/
	}	

	@After
	public  void tearDwon(){
		context.close();
	}
	
}
