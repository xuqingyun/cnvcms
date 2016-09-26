package com.cnv.cms.model;

public class UserGroup {
	private int id;
	private int u_id;
	private int g_id;
	private String tableName="t_user_group";
	
	public UserGroup() {}
	public UserGroup(int u_id, int g_id) {
		super();
		this.u_id = u_id;
		this.g_id = g_id;
	}
	public UserGroup(int id, int u_id, int g_id) {
		super();
		this.id = id;
		this.u_id = u_id;
		this.g_id = g_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public int getG_id() {
		return g_id;
	}
	public void setG_id(int g_id) {
		this.g_id = g_id;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	@Override
	public String toString() {
		return "UserGroup [id=" + id + ", u_id=" + u_id + ", g_id=" + g_id + ", tableName=" + tableName + "]";
	}
	
}
