package com.cnv.cms.mapper;

public interface BaseMapper<T> {
	Integer maxId();
	void add(T t);
	void delete(int id);
	void update(T t);
	T selectById(int id);
}
