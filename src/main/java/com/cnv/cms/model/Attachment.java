package com.cnv.cms.model;

import java.util.Date;

public class Attachment {
	//附件ID
	private int id;
	//所属的文章列表
	private int aid;
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
	//创建日期
	private Date createDate;
}
