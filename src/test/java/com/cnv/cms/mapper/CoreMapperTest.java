/**
 * 
 */
package com.cnv.cms.mapper;

import java.util.Date;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cnv.cms.model.Group;
import com.cnv.cms.model.Role;
import com.cnv.cms.model.User;
import com.cnv.cms.model.UserGroup;
import com.cnv.cms.model.UserRole;



public class CoreMapperTest {
	
//	private   UserMapper userMapper;
	private  ApplicationContext context;
	
	@Before
	public void setUp(){
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
//		userMapper = context.getBean(UserMapper.class);	
		
	}
	
//	@Test
	public void testUserMapper(){
		System.out.println("******************test user mapper**************");
		UserMapper userMapper = context.getBean(UserMapper.class);	
		//userMapper.deleteUser(1);
		User u = new User(0, "a", "a", "aff", "a@eff", "12321", 1, new Date());
		try {
			userMapper.addUser(u);
		}catch(Exception e){
			
		}
		User u2 = userMapper.selectUserByName("a");
		System.out.println(u2);		
		List<User> users = userMapper.selectUsers("%");

		System.out.println("------test selectUsers-------");
		for(User user : users){
			System.out.println(user);
		}	
		userMapper.deleteUser(u.getId());
	}
	
//	@Test
	public void testGroupMapper(){
		GroupMapper gm = context.getBean(GroupMapper.class);
		System.out.println("------test selectUsers-------");
		Group g = gm.selectGroup(1);
		System.out.println(g);

		g = new Group();
		g.setName("测试组1");
		gm.addGroup(g);
		
		List<Group> gs = gm.selectAllGroups();
		for(Group g1 : gs){
			System.out.println(g1);
		}	
		gm.deleteGroup(g.getId());
	}
	

	
//	@Test
	public void testRoleMapper(){
		RoleMapper mapper = context.getBean(RoleMapper.class);
		System.out.println("------test role mapper---------");
		System.out.println("------single query---------");
		Role model = mapper.selectRole(2);
		System.out.println(model);
		System.out.println("------add test---------");
		model.setName("测试角色");
		model.setRole_type(4);
		mapper.addRole(model);
		System.out.println("------multi query---------");
		List<Role> models = mapper.selectAllRoles();
		for(Role m : models){
			System.out.println(m);
		}	
		mapper.deleteRole(model.getId());

	}
	@Test
	public void testUserRoleMapper(){
		UserRoleMapper urm = context.getBean(UserRoleMapper.class);
		System.out.println("*************test user role mapper***************");
		UserRole u = urm.selectByID(5);
		System.out.println(u);

		u = new UserRole();
		u.setU_id(3);
		u.setR_id(1);
		urm.add(u);
		List<UserRole> gs = urm.selectAll();
		for(UserRole g1 : gs){
			System.out.println(g1);
		}	
		urm.delete(u.getId());
		System.out.println("------user roles query---------");
		List<Role> userRoles = urm.selectRolesByUserID(2);
		for(Role m : userRoles){
			System.out.println(m);
		}
		System.out.println("------user query by role---------");
		List<User> users = urm.selectUsersByRoleID(2);
		for(User u1 : users){
			System.out.println(u1);
		}
	}
	@Test
	public void testUserGroupMapper(){
		UserGroupMapper mapper = context.getBean(UserGroupMapper.class);
		System.out.println("*****************test suer group mapper*************");
		System.out.println("------single query---------");
		UserGroup model = mapper.selectByID(2);
		System.out.println(model);
		System.out.println("------add test---------");
		model.setU_id(4);
		model.setG_id(3);
		mapper.add(model);
		System.out.println("------multi query---------");
		List<UserGroup> models = mapper.selectAll();
		for(UserGroup m : models){
			System.out.println(m);
		}	
		mapper.delete(model.getId());
		System.out.println("------user gruops query---------");
		List<Group> userGroups = mapper.selectGroupsByUserID(2);
		for(Group m : userGroups){
			System.out.println(m);
		}	
		System.out.println("------user query by group---------");
		List<User> users = mapper.selectUsersByGroupID(1);
		for(User u : users){
			System.out.println(u);
		}	
	}
	
	@After
	public  void tearDwon(){
		//context.close();
	}
	
}
