# cnvcms
# cms系统
# 采用 springMVC +spring + mybatis +maven
test in my pc

version 0.0.7
	Service:
		ChannelService
		ChannelServiceImpl
	Mapper:
		ChannelMapper
	model:
		Channel	

version 0.0.6
	前台:
		admin框架
		admin/ user,group,role
					
version 0.0.5
	Controller:
		UserController
		GroupController
		RoleController
		AdmidController
	Service:
		GroupService
		GroupServiceImpl
		RoleService
		RoleServiceImpl
version 0.0.4
	Controller:
		AdminController
		UserController部分
	前台:
		admin/
			login.html login.js
			index.html index.js部分
			
version 0.0.3
	model:
		Pager
	Service:
		UserService
		UserServiceImpl
	Exception:
		CmsException
		
version 0.0.2
	model:
		User
		Group
		Role
		UserGroup
		UserRole
		RoleType
	
		
	Mapper:
		UserMapper
		UserGroupMapper
		UserRoleMapper
		RoleMapper
		GroupMapper
		
	Mapper.xml
		**-mapper.xml
	
vsrsion 0.0.1
	spring依赖
	mybatis依赖
	spring配置文件
		applicaationContext.xml
	mybatis配置文件
		mybatisConfig.xml
	合成，测试
	BasicMapperTest
