package com.cnv.cms.config;

import java.io.IOException;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;


/*
 * 定义扫描范围
 */
@Configuration
@ComponentScan(basePackages={"com.cnv.cms"})
@EnableTransactionManagement()
@Import(DaoConfig.class)
public class RootConfig {
	
	@Bean
	public CmsConfig cmsConfig() {
		CmsConfig cmsConfig = new CmsConfig();
		CmsConfig.setDebug(true);
		CmsConfig.setFtpServer("121.248.54.247");
		CmsConfig.setFtpUser("ftptest");
		CmsConfig.setFtpPassword("ftptest");
		CmsConfig.setFilePath("files");
		return cmsConfig;
	}
	
}
