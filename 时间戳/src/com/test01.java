package com;

public class test01 {

	/**
	 * @param args
	 * @throws InterruptedException 
	 */
	public static void main(String[] args) throws InterruptedException {
			long start = System.currentTimeMillis();
			m1();
			System.out.println((System.currentTimeMillis()-start)+"ms");//����ʱ���ȥ�����е�ʱ��
			start = System.currentTimeMillis();//��������ʱ��
			
			System.out.println("Hello");
			m2();
			System.out.println((System.currentTimeMillis()-start)+"ms");
	}	
	public static void m1() throws InterruptedException{
		Thread.sleep(5000);//��ͣ����
	}
	public static void m2() throws InterruptedException{
		Thread.sleep(3000);//��ͣ����
	}

}
