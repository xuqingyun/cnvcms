# cnvcms
# cms系统
# 采用 springMVC +spring + mybatis +maven


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