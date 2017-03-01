package com.cnv.cms.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.exception.CmsException;



/**
 * @author Administrator
 *
 * @description 用于往ftp服务器存储和删除文件
 *
 */
@Component("ftpUtil")  
public class FTPUtil {
	public boolean deleteFile(String fileName, String path){
		FTPClient ftp = new FTPClient();
		if(!this.connect(ftp)){
			throw new CmsException("无法连接FTP服务器");
		}
		ftp.enterLocalPassiveMode();
		//改变当前目录 
		String fliePath = CmsConfig.getFilePath()+"/"+path;
		try {
			//改变当前目录，如果失败则返回
			if(!ftp.changeWorkingDirectory(fliePath)){
				return false;
			}
			//删除文件，如果失败则返回
			if(!ftp.deleteFile(fileName)){
				return false;
			}
		} catch (IOException e) {
			return false;
		} 
		return true;
	}
	
	public boolean saveFile( MultipartFile uploadFile, String fileName, String path){
		FTPClient ftp = new FTPClient();
		InputStream input = null;
		try { 
			
			if(!this.connect(ftp)){
				throw new CmsException("无法连接FTP服务器");
			}
			
	        //ftp client告诉ftp server开通一个端口来传输数据
			ftp.enterLocalPassiveMode();
			//文件格式为二进制格式
			ftp.setFileType(FTP.BINARY_FILE_TYPE);
			
			//设置上传目录 
			String fliePath = CmsConfig.getFilePath()+"/"+path;
			if(!ftp.changeWorkingDirectory(fliePath)){
				//如果目录不存在则创建目录
				ftp.makeDirectory(fliePath);
				if(!ftp.changeWorkingDirectory(fliePath)){
					//System.out.println("无法进入目录");
					throw new CmsException("无法进入目录");
				}
			} 
			//String fileName = new String(uploadFile.getOriginalFilename().getBytes("utf-8"),"iso-8859-1");
			input = uploadFile.getInputStream();
			boolean bf = ftp.storeFile(fileName, input); 
			if(bf == false){
				throw new CmsException("文件存储至失败");
			}
			//input.close();  
		    ftp.logout(); 
		    
				
		} catch (IOException e) { 
			e.printStackTrace(); 
		} finally { 
			if(input!=null){
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
	        if (ftp.isConnected()) {  
	            try {  
	                ftp.disconnect();  
	            } catch (IOException ioe) {  
	            }  
	        }
		}
		return true;
	}
	
	private boolean connect(FTPClient ftp){
		try {
			//建立连接
			ftp.connect(CmsConfig.getFtpServer(),21); 
			//登录
			ftp.login(CmsConfig.getFtpUser(), CmsConfig.getFtpPassword()); 
			//返回码
			int reply = ftp.getReplyCode();  
			if (!FTPReply.isPositiveCompletion(reply)) {  
			    ftp.disconnect();  
			    return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			 return false;
			
		}
		return true;
		
	}
 
}  
