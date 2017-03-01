package com.cnv.cms.config;

/**
 * @author Administrator
 *
 * @description 系统配置信息,可以在applicationContext.xml中配置
 *
 */
public class CmsConfig {
	/*
	 * 是否为debug模式,debug模式会打印控制台信息
	 */
	public static boolean isDebug=true;
	/*
	 * ftp服务器ip地址
	 */
	static String ftpServer	="127.0.0.1";
	/*
	 * 存储文件的根路径
	 */
	static String filePath	="files";
	
	/**
	 * 登录ftp服务器用户名
	 */
	static String ftpUser;
	/*
	 * 登录ftp服务器密码
	 */
	static String ftpPassword;
	

	
	public static boolean getDebug() {
		return isDebug;
	}
	public static boolean isDebug() {
		return isDebug;
	}
	public static void setDebug(boolean isDebug) {
		CmsConfig.isDebug = isDebug;
	}
	public static String getFtpServer() {
		return ftpServer;
	}
	public static void setFtpServer(String ftpServer) {
		CmsConfig.ftpServer = ftpServer;
	}
	public static String getFilePath() {
		return filePath;
	}
	public static void setFilePath(String filePath) {
		CmsConfig.filePath = filePath;
	}
	public static String getFtpUser() {
		return ftpUser;
	}
	public static void setFtpUser(String ftpUser) {
		CmsConfig.ftpUser = ftpUser;
	}
	public static String getFtpPassword() {
		return ftpPassword;
	}
	public static void setFtpPassword(String ftpPassword) {
		CmsConfig.ftpPassword = ftpPassword;
	}

	
}
