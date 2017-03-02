package com.cnv.cms.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.cnv.cms.model.Attachment;

public interface AttachmentService extends BaseService<Attachment> {
	/*
	 * 删除文章附件
	 */
	void deleteByArticleId(int aid);
	/*
	 * 清空栏目附件
	 */
	void deleteByChannelId(int cid);	
	/*
	 * 设置Article ID
	 */
	void setArticleId(int id, int aid);
	/*
	 * 设置首页标志
	 */
	void setIndex(int id, int isIndex);
	/*
	 * 查询文章附件
	 */
	public List<Attachment> selectByArticleId(int aid);
	public List<Integer> selectIdsByArticleId(int aid);
	public Map<String, String> selectPicUrlByArticleId(int id);
	/*
	 * 查询文章图片
	 */
	public List<Attachment> selectPicByArticleId(int id);
	/*
	 * 查询首页图片
	 */
	public List<Attachment> selectIndexPic();
	/*
	 * 查找指定日期前的附件
	 */
	public List<Attachment> selectBeforeDate(Date date);
	/*
	 * 根据栏目查询附件
	 */	
	public List<Attachment> selectByChannelId(int cid);
	/*
	 * 查询未被文章引用的图片
	 */	
	public List<Attachment> selectUnused();
	/*
	 * 删除未被使用附件
	 */	
	void deletetUnused();
	
	/**************临时附件相关方法****************/
	/*
	 * 以clientid位主键，添加的对应的临时附件列表
	 */	
	public void addTempAttachs(String clientid, int id);
	/*
	 * 获得clientid对应的临时附件列表
	 */
	public List<Integer> getTempAttachs(String client);
	/*
	 * 删除clientid对应的临时附件列表
	 */
	public void removeTempAttachs(String client);
}
