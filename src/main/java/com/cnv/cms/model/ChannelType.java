package com.cnv.cms.model;

public enum ChannelType {
	NavChannel("导航栏目"),TopicList("文章列表栏目"),TopicContent("文章内容栏目"),TopicImg("图片内容栏目");
	private String name;
	private ChannelType(String name){
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
