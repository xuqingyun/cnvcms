#test table
create table tt1(
	id int not null auto_increment primary key,
	role enum
);
create table user(
	id int not null auto_increment primary key,
	username varchar(100)
);

########################################################################
#test table
create table t_user(
	id int not null auto_increment primary key,
	username varchar(50) not null unique,
	password varchar(50) not null,
	nickname varchar(50),
	email varchar(50),
	phone varchar(20),
	status int,
	createDate date
);

create table t_group(
	id int not null auto_increment primary key,
	name varchar(50) not null unique,
	descr varchar(200)
);
create table t_role(
	id int not null auto_increment primary key,
	name varchar(50) not null unique,
	role_type int
);
create table t_user_role(
	id int not null auto_increment primary key,
	u_id int,
	r_id int
);
create table t_user_group(
	id int not null auto_increment primary key,
	u_id int,
	g_id int
);



#################################################################

#测试数据
insert into user values(null,'nametest1');
insert into user values(null,'nametest2');
insert into user values(null,'nametest3');

insert into t_user values(null,'nametest1','f123','abc','abg@t.cn','1355434543',1,'2016-9-11');
insert into t_user values(null,'nametest2','aa345','abdc','abg@t.cn','123123',1,'2016-9-11');
insert into t_user values(null,'nametest3','x895','gabc','abg@t.cn','123123',1,'2016-9-11');
insert into t_user values(null,'shishuocms','shishuocms','gabc','abg@t.cn','123123',1,'2016-9-11');

insert into t_group values(null,"财务处",'负责财务部门');
insert into t_group values(null,"宣传部",'负责宣传部门');

insert into t_role values(null,"管理员",0);
insert into t_role values(null,'文章发布',1);
insert into t_role values(null,'审核人员',2);

insert into t_user_role values(null,1,1);
insert into t_user_role values(null,2,2);
insert into t_user_role values(null,2,3);
insert into t_user_role values(null,3,2);

insert into t_user_group values(null,2,2);
insert into t_user_group values(null,2,1);
insert into t_user_group values(null,3,1);
insert into t_user_group values(null,3,2);
insert into t_user_group values(null,3,3);
insert into t_user_group values(null,1,2);