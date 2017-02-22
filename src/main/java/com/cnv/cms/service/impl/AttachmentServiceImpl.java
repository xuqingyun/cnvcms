package com.cnv.cms.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnv.cms.exception.CmsException;
import com.cnv.cms.mapper.AttachmentMapper;
import com.cnv.cms.model.Attachment;
import com.cnv.cms.service.AttachmentService;
import com.cnv.cms.util.FTPUtil;

@Service("attachServiceImpl")
public class AttachmentServiceImpl implements AttachmentService {
	@Autowired
	private AttachmentMapper attachMapper;
	
	@Autowired
	private FTPUtil ftpUtil;
	
	private static Map<String,List<Integer>> tempAttachs = new HashMap<String,List<Integer>>();
	
	public void addTempAttachs(String clientid, int id){
		List<Integer> tempAtsList = tempAttachs.get(clientid);
		if(tempAtsList==null){
			tempAtsList = new ArrayList<Integer>();
			tempAttachs.put(clientid, tempAtsList);
		}
		tempAttachs.get(clientid).add(id);
	}
	public List<Integer> getTempAttachs(String client){
		return tempAttachs.get(client);
	}
	public void removeTempAttachs(String client){
		tempAttachs.remove(client);
	}
	
	//删除ftp服务器图片，内部使用
	private void delelteFile(Attachment a){
		if(a != null){
			ftpUtil.deleteFile(a.getNewName(), a.getPath());
		}
	}

	
	public boolean add(Attachment t) {
		try {
			Integer id = attachMapper.maxId();
			if(id==null) id=0;
			t.setId(id+1);
			attachMapper.add(t);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public boolean delete(int id) {
		
		try {
			Attachment a = attachMapper.selectById(id);
			attachMapper.delete(id);
			//删除ftp文件
			this.delelteFile(a);
		}catch(CmsException ce){
			throw new CmsException(ce.getMessage());
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean update(Attachment t) {
	
		try {
			attachMapper.update(t);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Attachment selectById(int id) {
		Attachment a = attachMapper.selectById(id);
		if(a==null) throw new CmsException("附件不存在");
		return a;
	}


	public void deleteByArticleId(int aid) {
		try {
			List<Attachment> attachs = attachMapper.selectByArticleId(aid);
			attachMapper.deleteByArticleId(aid);
			//删除ftp服务器文件
			for(Attachment a: attachs){
				this.delelteFile(a);
			}
		}catch(CmsException ce){
			throw new CmsException(ce.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new CmsException("附件删除失败");
		}
	}

	@Override
	public void deleteByChannelId(int cid) {
		try {
			List<Attachment> attachs = attachMapper.selectByChannelId(cid);
			//删除Attachment
			attachMapper.deleteByChannelId(cid);
			//删除ftp服务器文件
			for(Attachment a: attachs){
				this.delelteFile(a);
			}
		} catch(CmsException ce){
			throw new CmsException(ce.getMessage());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new CmsException("附件删除失败");
		}
	}

	@Override
	public void setArticleId(int id, int aid) {
		attachMapper.setArticleId(id, aid);
	}

	@Override
	public void setIndex(int id, int isIndex) {
		attachMapper.setIndex(id, isIndex);
	}

	@Override
	public  List<Attachment> selectByArticleId(int aid) {
		return attachMapper.selectByArticleId(aid);
	}

	@Override
	public List<Attachment> selectPicByArticleId(int id) {
		return attachMapper.selectPicByArticleId(id);
	}

	@Override
	public List<Attachment> selectIndexPic() {
		return attachMapper.selectIndexPic();
	}

	@Override
	public List<Attachment> selectBeforeDate(Date date) {
		return attachMapper.selectBeforeDate(date);
	}

	@Override
	public List<Attachment> selectByChannelId(int cid) {
		return attachMapper.selectByChannelId(cid);
	}

	@Override
	public List<Attachment> selectUnused() {
		return attachMapper.selectUnused();
	}

	@Override
	public void deletetUnused() {
		attachMapper.deletetUnused();
	}


	@Override
	public List<Integer> selectIdsByArticleId(int aid) {
		return attachMapper.selectIdsByArticleId(aid);
	}

}
