package com.soft151.system.test;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.soft151.system.bean.Stu;
import com.soft151.system.bean.UserInfo;

public class HibernateTest01 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		getUser();
	}


	public static void getUser() {
		//		SessionFactory sessionFactory = MySessionFactory.getSessionFactory();
		//		Session session = sessionFactory.openSession();
				Configuration configuration = new Configuration().configure();
				SessionFactory sessionFactory = configuration.buildSessionFactory();
				Session session = sessionFactory.openSession();
				//Transaction ts = session.beginTransaction();
				UserInfo userInfo = (UserInfo) session.load(UserInfo.class,"1");
				System.out.println(userInfo.getUsername());
				session.close();
	}

	
	public static void addStu() {
		Configuration configuration = new Configuration().configure();
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		Stu stu = new Stu();
		stu.setStuno(5);
		stu.setStuname("ÄÐ");
		stu.setAge(11);
		stu.setSex("ÄÐ");
		session.save(stu);
		ts.commit();
		session.close();
	}

}
