package com.cnv.cms.model;

public class Channel {
	/*
	 * 栏目主键
	 */
	private int id;
	/*
	 * 栏目名称
	 */
	private String name;
	/*
	 * 栏目类型
	 */
	private ChannelType channelType;
	/*
	 * 是否自定义链接，0表示否，1表示是
	 */
	private int customLink;
	/*
	 * 自定义链接地址
	 */
	private String customLinkUrl;
	/*
	 * 是否是首页栏目，0表示否，1表示是
	 */
	private int isIndex;
	/*
	 * 是否是首页顶部导航栏目，0表示否，1表示是
	 */
	private int isTopNav;
	/*
	 * 是否是推荐栏目,0表示否，1表示是
	 */
	private int isRecommend;
	/*
	 * 栏目状态,0表示停用，1表示启用
	 */
	private int status;
	/*
	 * 栏目序号
	 */
	private int orders;
	
	
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
	public int getChannelType() {
		return channelType.ordinal();
	}
	public void setChannelType(int channelType) {
		this.channelType = ChannelType.values()[channelType];
	}
	public int getCustomLink() {
		return customLink;
	}
	public void setCustomLink(int customLink) {
		this.customLink = customLink;
	}
	public String getCustomLinkUrl() {
		return customLinkUrl;
	}
	public void setCustomLinkUrl(String customLinkUrl) {
		this.customLinkUrl = customLinkUrl;
	}
	public int getIsIndex() {
		return isIndex;
	}
	public void setIsIndex(int isIndex) {
		this.isIndex = isIndex;
	}
	public int getIsTopNav() {
		return isTopNav;
	}
	public void setIsTopNav(int isTopNav) {
		this.isTopNav = isTopNav;
	}
	public int getIsRecommend() {
		return isRecommend;
	}
	public void setIsRecommend(int isRecommend) {
		this.isRecommend = isRecommend;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getOrders() {
		return orders;
	}
	public void setOrders(int orders) {
		this.orders = orders;
	}
	
	
}
