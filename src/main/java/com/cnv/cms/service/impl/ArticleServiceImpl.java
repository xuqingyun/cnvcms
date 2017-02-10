package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.ArticleMapper;
import com.cnv.cms.model.Article;
import com.cnv.cms.service.ArticleService;

@Service("articleServiceImpl")  
public class ArticleServiceImpl implements ArticleService {
	@Autowired
	private ArticleMapper articleMapper;
	
	public void add(Article t) {
		// TODO Auto-generated method stub
		int id = articleMapper.maxId();
		t.setId(id+1);
		try {
			articleMapper.add(t);
		} catch (Exception e) {
			throw new CmsException("文章添加失败");
		}
		// TODO 需要更新附件
	}

	public void delete(int id) {
		// TODO 需要删除附件
		try {
			articleMapper.delete(id);
		} catch (Exception e) {
			throw new CmsException("文章删除失败");
		}
	}

	public void update(Article t) {
		// TODO 需要更新附件
		try {
			articleMapper.update(t);
		} catch (Exception e) {
			throw new CmsException("文章更新失败");
		}
	}

	public Article selectById(int id) {
		Article at = articleMapper.selectById(id);
		if(at == null) throw new CmsException("文章不存在");
		// TODO 查询附件
		return at;
	}

	public void deleteByChannel(int id) {
		// TODO 需要删除附件
		try {
			articleMapper.deleteByChannel(id);
		} catch (Exception e) {
			throw new CmsException("文章删除失败");
		}
	}

	public void changeStatus(int id) {
		articleMapper.changeStatus(id);
	}

	public void addReadTimes(int id, int n) {
		articleMapper.addReadTimes(id, n);
	}

	public void addFellows(int id, int n) {
		articleMapper.addFellows(id, n);
	}

	public List<Article> selectPage(int page, int n) {
		return articleMapper.selectFromTo(page*(n-1), n);
	}

	public List<Article> selectByTitle(String title) {
		// TODO Auto-generated method stub
		List<Article> ats = articleMapper.selectByTitle(title);
		return ats;
	}

	public List<Article> selectByChannel(int id) {
		// TODO Auto-generated method stub
		return articleMapper.selectByChannel(id);
	}

	public List<Article> selectByKeywords(String keywords) {
		// TODO Auto-generated method stub
		return articleMapper.selectByKeywords(keywords);
	}

	public List<Article> selectRecommends() {
		// TODO Auto-generated method stub
		return articleMapper.selectRecommends();
	}

	public List<Article> selectRecommends(int channelId) {
		// TODO Auto-generated method stub
		return articleMapper.selectRecommendsInChannel(channelId);
	}

	public List<Article> selectTopRead(int n) {
		// TODO Auto-generated method stub
		return articleMapper.selectTopRead(n);
	}

	public List<Article> selectTopRead(int n, int channelId) {
		// TODO Auto-generated method stub
		return articleMapper.selectTopReadInChannel(n, channelId);
	}

	public List<Article> selectTopFellow(int n) {
		// TODO Auto-generated method stub
		return articleMapper.selectTopFellow(n);
	}

}
