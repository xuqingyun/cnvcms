package com.cnv.cms.service;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import com.cnv.cms.model.Article;
@Transactional
public interface ArticleService extends BaseService<Article> {
	@Transactional
	public boolean add(Article t, String client);
	/*
	 * 删除栏目下全部文章
	 */
	@Transactional
	void deleteByChannel(int id);
	/*
	 * 删除用户全部文章
	 */
	@Transactional
	void deleteByUser(int userId);
	/*
	 * 改变文章状态
	 */
	void changeStatus(int id);
	/*
	 * 设置文章查看次数
	 */
	void addReadTimes(int id, int n);
	/*
	 * 设置文章关注人数
	 */
	void addFellows(int id, int n);
	/*
	 * 分页查询
	 * 查询第page个页面内容
	 * n：每页数量
	 */
	List<Article> selectPage(int page, int n);	
	/*
	 * 通过用户id检索
	 */
	List<Article> selectByUserId(int id);
	/*
	 * 通过标题检索
	 */
	List<Article> selectByTitle(String title);
	/*
	 * 检索栏目下 的全部文章
	 */	
	List<Article> selectByChannel(int id);
	/*
	 * 通过关键字检索
	 */	
	List<Article> selectByKeywords(String keywords);
	/*
	 * 检索推荐文章
	 */	
	List<Article> selectRecommends();	
	List<Article> selectRecommends(int channelId);
	/*
	 * 检索查看次数最多的N个条目
	 */	
	List<Article> selectTopRead(int n);	
	List<Article> selectTopRead(int n, int channelId);
	/*
	 * 检索关注次数最多的文章
	 */	
	List<Article> selectTopFellow(int n);
}
