package com.cnv.cms.config;

import java.io.IOException;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
//@ImportResource("WEB-INF/classes/transaction-test.xml")
@MapperScan(basePackages="com.cnv.cms.mapper")//如果使用使用Bean方法配置basePackge,事务不起作用，原因不知
public class DaoConfig {
	
	@Bean
	public DriverManagerDataSource dataSource(){
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://121.248.54.247:3306/cnvcms");
		dataSource.setUsername("root");
		dataSource.setPassword("920526");
		return dataSource;
	}
	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() throws IOException{
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());

		ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		Resource[] r =  resolver.getResources("classpath*:mybatisConfig.xml");
		sqlSessionFactory.setConfigLocation(r[0]);
		Resource[] resources= resolver.getResources("classpath*:com/cnv/cms/mapper/*-mapper.xml");  
		sqlSessionFactory.setMapperLocations(resources);
		return sqlSessionFactory;
	} 
	
	@Bean
	public DataSourceTransactionManager txManager(DriverManagerDataSource dataSource){
		DataSourceTransactionManager txManager = new DataSourceTransactionManager();
		txManager.setDataSource(dataSource);
		return txManager;
	}
}
