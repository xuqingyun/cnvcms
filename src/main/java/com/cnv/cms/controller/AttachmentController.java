package com.cnv.cms.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cnv.cms.authority.AuthClass;
import com.cnv.cms.authority.AuthMethod;
import com.cnv.cms.config.CmsConfig;
import com.cnv.cms.model.Attachment;
import com.cnv.cms.service.AttachmentService;
import com.cnv.cms.util.FTPUtil;

@AuthClass
@Controller
@RequestMapping("/api/files")
public class AttachmentController {
	@Autowired
	@Qualifier("attachServiceImpl")
	private AttachmentService attachService;
	
	@Autowired
	private FTPUtil ftpUtil; 
	
	@AuthMethod(role="customer")
	@RequestMapping(value="/delete/{clientid}/{id}",method=RequestMethod.GET)
	public  @ResponseBody Map<String, Object>  delete(@PathVariable int id,
			@PathVariable(value="clientid") String clientid, HttpSession httpSession){
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<Integer> tempAts = attachService.getTempAttachs(clientid);
		if(tempAts.contains(id)){
			attachService.delete(id);
		}
		map.put("flag", "success");
		return map;
	}
	
	@AuthMethod(role="customer")
	@RequestMapping(value="/uploadImg/{clientid}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  uploadImg(@RequestParam("filedata") MultipartFile file,
			HttpServletRequest request,@PathVariable(value="clientid") String clientid){
		
		Map<String, Object> map = upload(file,request,clientid,"Img");

		return map;
	}
	@AuthMethod(role="customer")
	@RequestMapping(value="/uploadMedia/{clientid}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  uploadMedia(@RequestParam("filedata") MultipartFile file,
			HttpServletRequest request,@PathVariable(value="clientid") String clientid){
		
		Map<String, Object> map = upload(file,request,clientid,"Media");

		return map;
	}
	@AuthMethod(role="customer")
	@RequestMapping(value="/uploadFlash/{clientid}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  uploadFlash(@RequestParam("filedata") MultipartFile file,
			HttpServletRequest request,@PathVariable(value="clientid") String clientid){
		
		Map<String, Object> map = upload(file,request,clientid,"Flash");

		return map;
	}
	@AuthMethod(role="customer")
	@RequestMapping(value="/uploadFile/{clientid}",method=RequestMethod.POST)
	public  @ResponseBody Map<String, Object>  uploadFile(@RequestParam("filedata") MultipartFile file,
			HttpServletRequest request,@PathVariable(value="clientid") String clientid){
		
		Map<String, Object> map = upload(file,request,clientid,"File");

		return map;
	}
	private Map<String, Object> upload(MultipartFile file, HttpServletRequest request, String clientid, String fileType) {
		Map<String, Object> map = new HashMap<String, Object>();
		//原文件名
        String fileName = file.getOriginalFilename();  
        //文件后缀名
        String suffix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
        //String nName = System.currentTimeMillis() + suffix;
        //新文件名格式: 年月日_时分秒
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmssSSS"); 
        String newName = sdf.format(new Date()) + suffix;
        //以年月日作为目录
        String ymdPath = newName.substring(0, newName.indexOf("_"));
        
        if(CmsConfig.isDebug()){
        	System.out.println("-------file upload---------");  
        	System.out.println("received filename:"+fileName);
        	System.out.println("suffix:"+suffix);
        	System.out.println("new filename:"+newName);
        	
        }

        //文件保存到服务器  
        try {  
            ftpUtil.saveFile(file, newName, ymdPath);
        } catch (Exception e) {  
            e.printStackTrace();  
            map.put("err", e.getMessage());
            //map.put("flag", e.getMessage());
            return map;
        } 
        
        
        //把Attachment存储到数据库中
        int isPic=0;
        if(fileType.equals("Img")) {
        	isPic = 1;
        }
        Attachment a = new Attachment(fileName,newName,ymdPath,fileType,isPic);
        if(!attachService.add(a)){
        	ftpUtil.deleteFile(fileName, ymdPath);
        }
			
		
        Integer fileid = a.getId();
        
        try {
			//添加到临时文件列表
			attachService.addTempAttachs(clientid, fileid);
		} catch (Exception e) {
			e.printStackTrace();
			attachService.delete(a.getId());
		}
        
        
        String httpUrl = "http://"+CmsConfig.getFtpServer()+"/"+CmsConfig.getFilePath()
        				+"/"+ymdPath+"/"+newName;
        Map<String, String> msg = new HashMap<String, String>();
        map.put("err", "");
        msg.put("url", httpUrl);
        msg.put("localfile", fileName);
        msg.put("id", fileid.toString());
        map.put("msg", msg);
        //map.put("flag", "success");
		return map;
	}
	
	@RequestMapping(value="/upload2",method=RequestMethod.POST)
	public  @ResponseBody Map<String, String>  upload2(@RequestBody MultipartFile file, HttpServletRequest request){
		Map<String, String> map = new HashMap<String, String>();
        System.out.println("开始");  
        String path = request.getSession().getServletContext().getRealPath("upload"); 
        String fileName = file.getOriginalFilename();  
        
//        String fileName = new Date().getTime()+".jpg";  
        System.out.println(path+"/"+fileName);  
        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
        map.put("flag", "false");
        //保存  
        try {  
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
            map.put("flag", e.getMessage());
        }  	
        map.put("flag", "success");
        
		return map;
		
	}

}
