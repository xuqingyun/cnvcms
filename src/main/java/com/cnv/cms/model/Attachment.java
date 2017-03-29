package com.cnv.cms.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Attachment {
	//附件ID
	private int id;
	//所属的文章列表
	private int aid=-1;
	//原文件名
	private String oldName;
	/*
	 * 新文件名
	 * 用时间命名:TimeMillis
	 */
	private String newName;
	/*
	 * 附件路径
	 * 以创建年月日为文件夹
	 */
	private String path;
	//文件后缀名
	private String suffix;
	//是否为图片文件
	private int isPic;
	//是否为首页图片
	private int isIndex;
	//创建日期
	private Date createDate=new Date();
	
	public Attachment(){}
	public Attachment(String oldName, String newName, String path, String suffix, int isPic) {
		super();
		this.oldName = oldName;
		this.newName = newName;
		this.path = path;
		this.suffix = suffix;
		this.isPic = isPic;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public String getOldName() {
		return oldName;
	}
	public void setOldName(String oldName) {
		this.oldName = oldName;
	}
	public String getNewName() {
		return newName;
	}
	public void setNewName(String newName) {
		this.newName = newName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getSuffix() {
		return suffix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	public int getIsPic() {
		return isPic;
	}
	public void setIsPic(int isPic) {
		this.isPic = isPic;
	}
	public int getIsIndex() {
		return isIndex;
	}
	public void setIsIndex(int isIndex) {
		this.isIndex = isIndex;
	}
	@JsonFormat(pattern="yyyy-MM-dd hh:mm:ss",timezone = "GMT+8")
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	
}
