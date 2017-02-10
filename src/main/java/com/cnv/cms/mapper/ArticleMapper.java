package com.cnv.cms.mapper;

import java.util.List;

import com.cnv.cms.model.Article;

public interface ArticleMapper extends BaseMapper<Article> {
	/*
	 * 删除栏目下全部文章
	 */
	void deleteByChannel(int id);
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
	 * 检索offset+1开始往后n个记录
	 */
	List<Article> selectFromTo(int offset, int n);	
	/*
	 * 通过标题检索
	 */
	List<Article> selectByTitle(String title);
	/*
	 * 通过栏目id检索
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
	List<Article> selectRecommendsInChannel(int channelId);
	/*
	 * 检索查看次数最多的文章
	 */	
	List<Article> selectTopRead(int n);	
	List<Article> selectTopReadInChannel(int n, int channelId);
	/*
	 * 检索关注次数最多的文章
	 */	
	List<Article> selectTopFellow(int n);
	
	
}
