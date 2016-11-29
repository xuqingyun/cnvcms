package com.cnv.cms.model;

import javax.validation.constraints.NotNull;

public class Group {
	private int id;
	@NotNull
	private String name;
	private String descr;
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
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	@Override
	public String toString() {
		return "Group [id=" + id + ", name=" + name + ", descr=" + descr + "]";
	}
	
}
