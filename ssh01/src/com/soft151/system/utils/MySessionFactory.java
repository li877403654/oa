package com.soft151.system.utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class MySessionFactory {
	private static Configuration configuration=null;
	private static SessionFactory	sessionFactory=null;
	public MySessionFactory() {
		super();
	}
	static{
		configuration = new Configuration().configure();
		sessionFactory = configuration.buildSessionFactory();
	}
	public static SessionFactory getSessionFactory(){
		return sessionFactory;
	}
}
