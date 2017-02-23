package com.cnv.cms.model;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Article {
	/*
	 * 文章id
	 */
	private int id; 
	/*
	 * 文章标题
	 */
	@NotNull
	private String title;	
	/*
	 * 描述
	 */
	private String summary;
	/*
	 * 内容
	 */
	private String content;
	/*
	 * 文章关键字，用 | 分开
	 */
	private String keywords;
	
	/*
	 * 作者id
	 */
	private int userId;
	/*
	 * 作者名
	 */
	private String author;
	/*
	 * 所属栏目ID
	 */
	@NotNull
	private int channelId;
	/*
	 * 文章状态,0未审核，1已发布
	 */
	private int status;
	/*
	 * 创建时间
	 */
	private Date createDate=new Date();
	/*
	 * 是否推荐文章
	 */
	private int recommend;
	/*
	 * 图片栏目时，所要显示的图片的id
	 */
	private int chiefPic;
	/*
	 * 文章附件列表
	 */
	private List<Integer> attachs;
	/*
	 * 查看次数
	 */
	private int readTimes;
	/*
	 * 关注人数
	 */
	private int fellows;
	
	//getters and setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getKeywords() {
		return keywords;
	}
	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public int getChannelId() {
		return channelId;
	}
	public void setChannelId(int channelId) {
		this.channelId = channelId;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public int getRecommend() {
		return recommend;
	}
	public void setRecommend(int recommend) {
		this.recommend = recommend;
	}
	public int getChiefPic() {
		return chiefPic;
	}
	public void setChiefPic(int chiefPic) {
		this.chiefPic = chiefPic;
	}
	public List<Integer> getAttachs() {
		return attachs;
	}
	public void setAttachs(List<Integer> attachs) {
		this.attachs = attachs;
	}
	public int getReadTimes() {
		return readTimes;
	}
	public void setReadTimes(int readTimes) {
		this.readTimes = readTimes;
	}
	@Override
	public String toString() {
		return "Article [id=" + id + ", title=" + title + ", summary=" + summary + ", content=" + content
				+ ", keywords=" + keywords + ", userId=" + userId + ", author=" + author + ", channelId=" + channelId
				+ ", status=" + status + ", createDate=" + createDate + ", recommend=" + recommend + ", chiefPic="
				+ chiefPic + ", attachs=" + attachs + ", readTimes=" + readTimes + ", fellows=" + fellows + "]";
	}
	
}
