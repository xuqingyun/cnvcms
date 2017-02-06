# test info
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
create table t_attachment(
	id int not null auto_increment primary key, 
	oldName varchar(256) not null,
	newName varchar(256) not null,
	path varchar(256) not null,
	suffix varchar(256),
	isPic int not null,
	createDate date
);
create table t_article(
	id int not null auto_increment primary key,
	title varchar(200) not null,
	summary text,
	content text,
	keywords varchar(150),
	userId int,
	channelId int,
	status int,
	createDate date,
	recommend int,
	chiefPic int
);

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


create table t_channel(
	id int not null auto_increment primary key,
	name varchar(50) not null unique,
	channelType int not null,
	customLink int,
	customLinkUrl varchar(200),
	isIndex int,
	parentId int,
	isTopNav int,
	isRecommend int,
	status int,
	orders int
);

#################################################################

#测试数据

insert into t_article values(null,'标题1','摘要1','内容1','关键字1|关键字2',104,2,1,'2017-1-11',1,1);
insert into t_article values(null,'标题2','摘要2','内容2','关键字1|关键字2',104,2,1,'2017-1-11',1,1);
insert into t_article values(null,'标题3','摘要3','内容3','关键字1|关键字2',104,2,1,'2017-1-11',1,1);
insert into t_article values(null,'标题4','摘要4','内容4','关键字1|关键字2',104,3,1,'2017-1-11',1,1);


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

insert into t_channel values(null,'体育',0,0,null,1,-1,1,1,1,1);
insert into t_channel valuse(null,'足球',1,0,null,1,1,1,1,1,1);
insert into t_channel valuse(null,'篮球',1,0,null,1,1,1,1,1,2);
insert into t_channel valuse(null,'娱乐',0,0,null,1,-1,1,1,1,2);
insert into t_channel valuse(null,'财经',0,0,null,1,-1,1,1,1,3);