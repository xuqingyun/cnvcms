package com.cnv.cms.config;

public class CmsConfig {
	public static boolean isDebug=true;
	static String ftpServer	="127.0.0.1";
	static String filePath	="files";
	static String ftpUser;
	static String ftpPassword;
	static String test="test";
	
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
	public static String getTest() {
		return test;
	}
	public static void setTest(String test) {
		CmsConfig.test = test;
	}
	
}
