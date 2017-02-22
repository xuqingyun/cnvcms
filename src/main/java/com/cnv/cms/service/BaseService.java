package com.cnv.cms.service;

import com.cnv.cms.exception.CmsException;

public interface BaseService<T> {
	boolean add(T t);
	boolean delete(int id);
	boolean update(T t);
	T selectById(int id);	
}
