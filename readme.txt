# cnvcms
# cms系统
# 采用 springMVC +spring + mybatis +maven

version 0.0.8.6
	前台：
		文章添加页面
		用户中心页面

version 0.0.8.5
	Service:
		ArticleServiceImpl
		AttachmentService
		AttachmentServiceImpl
	Mapper:
		AttachmentMapper
	Controller:
		AttachmentController(文件上传)
		ArticleController(部分：基本增删改查)
	
version 0.0.8.4
	增加文章类、Mapper、Service：
	Service:
		ArticleService
		ArticleServiceImpl(部分)
	Mapper:
		ArticlelMapper
	model:
		Article	
version 0.0.8.3
	重写前端模板			
version 0.0.8

	增加权限管理:
	  	packge:authorith
			AuthClass - 类权限注解
			AuthMethod - 方法权限注解
			AuthUtil - 权限初始化
		packge:web
			InitServlet - 启动时加载的Servlet, 用来初始化权限
			AuthInterceptor - REST接口拦截器，拦截api/**，权限管理
			AdminInterceptor - 静态资源拦截器，拦截admin/**

version 0.0.7.1
	前台:
		Channel: 展示，增加，编辑
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
