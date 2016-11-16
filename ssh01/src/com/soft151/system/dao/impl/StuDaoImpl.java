package com.soft151.system.dao.impl;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.hql.classic.WhereParser;
import org.springframework.stereotype.Repository;

import com.soft151.system.bean.UserInfo;
import com.soft151.system.dao.StuDao;
import com.soft151.system.utils.HibernateUtil;
import com.soft151.system.utils.MySessionFactory;

@Repository
public class StuDaoImpl implements StuDao {
	private Session session = null;
	private Transaction ts = null;
	List<UserInfo> user=null;
	@Override
	public UserInfo loginUser(UserInfo userInfo) {
		try {
			//session = MySessionFactory.getSessionFactory().openSession();
			session = HibernateUtil.getCurrentSession();
			ts = session.beginTransaction();
			//user = session.createSQLQuery("from UserInfo where userid="+userInfo.getUserid()+" and password="+userInfo.getPassword()).list();
			userInfo = (UserInfo) session.get(UserInfo.class, userInfo.getUserid());
			List<UserInfo> list = session.createQuery("from userInfo").list();
//			Iterator<UserInfo> it = list.iterator();
//			while (it.hasNext()) {
//				System.out.println(it.toString());
//			}
			
			ts.commit();
		} catch (Exception e) {
			if (ts!=null) {
				ts.rollback();
			}
			throw new RuntimeException("¥ÌŒÛ¡À!");
		}finally{
			if(session!=null&&session.isOpen()){
				session.close();
			}
		}
		return userInfo;
		
//		session = MySessionFactory.getSessionFactory().openSession();
//		userInfo = (UserInfo) session.get(UserInfo.class, userInfo.getUserid());
//		return userInfo;
	}

}