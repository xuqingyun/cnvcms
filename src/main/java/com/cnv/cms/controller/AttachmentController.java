package com.cnv.cms.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cnv.cms.authority.AuthClass;
import com.cnv.cms.service.AttachmentService;

@AuthClass
@Controller
@RequestMapping("/api/files")
public class AttachmentController {
	@Autowired
	@Qualifier("attachServiceImpl")
	private AttachmentService attachService;
	
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	public  @ResponseBody Map<String, String>  post(@RequestBody MultipartFile file, HttpServletRequest request){
		Map<String, String> map = new HashMap<String, String>();
        System.out.println("开始");  
        String path = request.getSession().getServletContext().getRealPath("upload"); 
        String fileName = file.getOriginalFilename();  
//        String fileName = new Date().getTime()+".jpg";  
        System.out.println(path);  
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
