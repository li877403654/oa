package com.soft151.system.utils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	private static SessionFactory sessionFactory=null;
	private static ThreadLocal<Session> threadLocal= new ThreadLocal<Session>();
	private static Session session = null;
	
	private HibernateUtil(){}
	
	static{
		sessionFactory= new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
	}
	
	//获取全新的Session
	public static Session openSession(){
		return sessionFactory.openSession();
	}
	//获取和线程关联的session
	public static Session getCurrentSession(){
		Session session = threadLocal.get();
		//判断是否得到
		if (session==null) {
			session = sessionFactory.openSession();
			//把Session对象设置到threadLocal,相当于该session已经和线程绑定
			threadLocal.set(session);
		}
		
		return session;
	}
}