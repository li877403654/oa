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
	
	//��ȡȫ�µ�Session
	public static Session openSession(){
		return sessionFactory.openSession();
	}
	//��ȡ���̹߳�����session
	public static Session getCurrentSession(){
		Session session = threadLocal.get();
		//�ж��Ƿ�õ�
		if (session==null) {
			session = sessionFactory.openSession();
			//��Session�������õ�threadLocal,�൱�ڸ�session�Ѿ����̰߳�
			threadLocal.set(session);
		}
		
		return session;
	}
}