package com.soft151.system.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.soft151.system.bean.UserInfo;
import com.soft151.system.service.StuService;
import com.soft151.system.service.impl.StuServiceImpl;

@Controller
public class StuController {
	@Resource
	private StuService stuService;
	
	@RequestMapping(value="login",method=RequestMethod.GET)
	public @ResponseBody int login(@RequestParam String userid,String password){
		UserInfo userInfo = new UserInfo();
		userInfo.setUserid(userid);
		userInfo.setPassword(password);
		UserInfo userinfo1= stuService.login(userInfo);
		if(userinfo1!=null){
			System.out.println(userinfo1.getUsertype());
			return userinfo1.getUsertype();
		}
		System.out.println("Ê§°Ü");
		return -1;
	}
	
}