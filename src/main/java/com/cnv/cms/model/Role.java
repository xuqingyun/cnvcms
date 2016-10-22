package com.cnv.cms.model;
/*
 * 角色对象，可以访问的功能，
 */
public class Role {
	private int id;
	private String name;
	private int role_type;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRole_type() {
		return role_type;
	}
	public void setRole_type(int role_type) {
		this.role_type = role_type;
	}

/*	public RoleType getRole(){
		return RoleType.values()[role_type];
		
	}
*/	
	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + ", roleType=" + role_type + "]";
	}
	
}
