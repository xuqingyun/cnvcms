package com.cnv.cms.mapper;

import java.util.Date;
import java.util.List;

import com.cnv.cms.model.Attachment;

public interface AttachmentMapper extends BaseMapper<Attachment> {
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
	List<Attachment> selectByArticleId(int aid);
	List<Integer> selectIdsByArticleId(int aid);
	/*
	 * 查询文章图片
	 */
	List<Attachment> selectPicByArticleId(int id);
	/*
	 * 查询首页图片
	 */
	List<Attachment> selectIndexPic();
	/*
	 * 查找指定日期前的附件
	 */
	List<Attachment> selectBeforeDate(Date date);
	/*
	 * 根据栏目查询附件
	 */	
	List<Attachment> selectByChannelId(int cid);
	/*
	 * 查询未被文章引用的图片
	 */	
	List<Attachment> selectUnused(Date date);
	/*
	 * 删除未被使用附件
	 */
	void deletetUnused();
	void deletetUnusedBefore(Date date);
	
}
