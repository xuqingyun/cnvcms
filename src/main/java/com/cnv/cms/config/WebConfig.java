package com.cnv.cms.config;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.cnv.cms.web.AdminInterceptor;
import com.cnv.cms.web.AuthInterceptor;
import com.cnv.cms.web.UserInterceptor;
/*
 * springmvc配置
 * 对应于springmvc4-servlet.xml
 */
@Configuration
@ImportResource("WEB-INF/springmvc4-servlet.xml")
//@EnableWebMvc //不能重复使用EnableWebMvc和<mvc:annotation-driven />
//@ComponentScan(basePackages={"com.cnv.cms.controller"})//不能和xml文件中重复定义

public class WebConfig extends WebMvcConfigurerAdapter {

/*    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        resolver.setExposeContextBeansAsAttributes(true);
        return resolver;
    }
    
    @Bean
    public MappingJackson2HttpMessageConverter jsonConverter(){
    	 MappingJackson2HttpMessageConverter jsonConverter = 
    			 new MappingJackson2HttpMessageConverter();
    	 ArrayList<MediaType> list = new ArrayList<MediaType>();
    	 list.add(new MediaType("application/json;charset=UTF-8"));
    	 jsonConverter.setSupportedMediaTypes(list);
		return jsonConverter;
    }
    @Bean
    public AnnotationMethodHandlerAdapter annotationMethodHandlerAdapter(){
    	AnnotationMethodHandlerAdapter handler = 
    			 new AnnotationMethodHandlerAdapter();
    	 ArrayList<MediaType> list = new ArrayList<MediaType>();
    	 list.add(new MediaType("application/json;charset=UTF-8"));
    	 HttpMessageConverter<?>[] messageConverters = {jsonConverter()};
		handler.setMessageConverters(messageConverters);
		return handler;
    }
    
	@Bean
	public CommonsMultipartResolver multipartResolver(){
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setDefaultEncoding("utf-8");
		multipartResolver.setMaxInMemorySize(10240);
		multipartResolver.setMaxUploadSize(-1);
		return multipartResolver;
	}
	
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/admin/**")
        		.addResourceLocations("/WEB-INF/front/admin/");
        registry.addResourceHandler("/css/**")
				.addResourceLocations("/WEB-INF/front/css/");
        registry.addResourceHandler("/dist/**")
				.addResourceLocations("/WEB-INF/front/dist/");
        registry.addResourceHandler("/images/**")
				.addResourceLocations("/WEB-INF/front/images/");
        registry.addResourceHandler("/js/**")
				.addResourceLocations("/WEB-INF/front/js/");
        registry.addResourceHandler("/user/**")
				.addResourceLocations("/WEB-INF/front/user/");
        registry.addResourceHandler("/vendor/**")
				.addResourceLocations("/WEB-INF/front/vendor/");
        registry.addResourceHandler("*.*")
 				.addResourceLocations("/WEB-INF/front/html/");
    }
    
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new AuthInterceptor()).addPathPatterns("/api/**");
		registry.addInterceptor(new AdminInterceptor()).addPathPatterns("/admin/**");
		registry.addInterceptor(new UserInterceptor()).addPathPatterns("/user/**");
	}
    */
 /*   *//**
     * 启用spring mvc 的注解
     *//*
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }*/
}
