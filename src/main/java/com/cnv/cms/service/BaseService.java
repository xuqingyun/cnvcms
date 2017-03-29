package com.cnv.cms.service;

import org.springframework.transaction.annotation.Transactional;

/**
 * @author Administrator
 *
 * @description 基本增删改查接口
 *
 * @param <T>
 */
@Transactional
public interface BaseService<T> {
	
	/**
	 * @desription 添加
	 * @param t：要添加的类型对象
	 * @return 是否添加成功
	 */
	boolean add(T t);
	/**
	 * @desription 删除服务
	 * @param id:要删除的对象id
	 * @return 是否删除成功
	 */
	boolean delete(int id);
	/**
	 * @desription 更新
	 * @param t：被更新对象，id为必须项
	 * @return 是否更新成功
	 */
	boolean update(T t);
	/**
	 * @desription 根据id查询对象信息
	 * @param id 要查询的对象id
	 * @return 查询到的对象
	 */
	T selectById(int id);	
}
