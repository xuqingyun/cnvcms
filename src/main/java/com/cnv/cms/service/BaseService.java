package com.cnv.cms.service;

public interface BaseService<T> {
	void add(T t);
	void delete(int id);
	void update(T t);
	T selectById(int id);	
}
