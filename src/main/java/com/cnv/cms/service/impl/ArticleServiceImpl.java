package com.cnv.cms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.ArticleMapper;
import com.cnv.cms.mapper.AttachmentMapper;
import com.cnv.cms.model.Article;
import com.cnv.cms.service.ArticleService;
import com.cnv.cms.service.AttachmentService;

@Service("articleServiceImpl")  
public class ArticleServiceImpl implements ArticleService {
	@Autowired
	private ArticleMapper articleMapper;
	@Autowired
	private AttachmentMapper attachMapper;
	
	@Autowired
	@Qualifier("attachServiceImpl")
	private AttachmentService attachService;
	
	public boolean add(Article t) {
		Integer id = articleMapper.maxId();
		if(id==null) id=0;
		t.setId(id+1);
		try {
			articleMapper.add(t);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		//逐个更新
		for(int at : t.getAttachs()){
			try {
				attachMapper.setArticleId(at, t.getId());
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		
		return true;
	}
	public boolean add(Article t, String client) {
		
		if(!add(t)){
			//发生错误把文章删除
			articleMapper.delete(t.getChannelId());
			//删除临时附件
			List<Integer> attachTempIDs = attachService.getTempAttachs(client);
			if (attachTempIDs != null) {
				for (int at : attachTempIDs) {
					attachService.delete(at);
				} 
			}
			attachService.removeTempAttachs(client);
			return false;
		}
		
		try {
			List<Integer> attachIDs = t.getAttachs();
			List<Integer> attachTempIDs = attachService.getTempAttachs(client);
			if (attachTempIDs != null) {
				//如果临时附件不在提交的附件id列表中，则删除
				for (int at : attachTempIDs) {
					if (!attachIDs.contains(at)) {
						attachService.delete(at);
					}
				} 
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		attachService.removeTempAttachs(client);
		return true;
	}

	public boolean delete(int id) {
		
		try {
			//删除Article
			attachMapper.deleteByArticleId(id);
			//删除附件
			articleMapper.delete(id);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public boolean update(Article t) throws CmsException{
		// TODO 需要更新附件
		Article aOld = articleMapper.selectById(t.getId());
		if(aOld==null){
			throw new CmsException("文章不存在");
		}
		List<Integer> attachIDs = t.getAttachs();
		List<Integer> attachOldIDs = attachMapper.selectIdsByArticleId(t.getId());
		//如果原有附件不在新的附件列表中，则删除
		for(int at : attachOldIDs){
			if(!attachIDs.contains(at)){
				attachMapper.delete(at);
			}
		}
		//如果新的附件不在原有附件列表中，则更新
		for(int at : attachIDs){
			if(!attachOldIDs.contains(at)){
				attachMapper.setArticleId(at, t.getId());
			}
		}
		try {
			articleMapper.update(t);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public Article selectById(int id) {
		Article at = articleMapper.selectById(id);
		if(at == null) throw new CmsException("文章不存在");
		
		//  查询附件
		at.setAttachs(attachMapper.selectIdsByArticleId(id));
		
		return at;
	}

	public void deleteByChannel(int id) {
		try {
			//删除Article
			articleMapper.deleteByChannel(id);
			//删除附件
			attachMapper.deleteByChannelId(id);
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
