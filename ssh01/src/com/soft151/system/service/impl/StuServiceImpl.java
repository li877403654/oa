package com.soft151.system.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.soft151.system.bean.UserInfo;
import com.soft151.system.dao.StuDao;
import com.soft151.system.service.StuService;

@Service
public class StuServiceImpl implements StuService {

	@Resource
	private StuDao stuDao;
	@Override
	public UserInfo login(UserInfo userInfo) {
		UserInfo userInfo1 =  stuDao.loginUser(userInfo);
		if(userInfo1!=null){
			if(userInfo.getPassword().equals(userInfo1.getPassword())){
				System.out.println("√‹¬Î’˝»∑!");
				return userInfo1;
			}
		}
		System.out.println("√‹¬Î¥ÌŒÛ!");
		return null;
	}
}