package com;

public class test01 {

	/**
	 * @param args
	 * @throws InterruptedException 
	 */
	public static void main(String[] args) throws InterruptedException {
			long start = System.currentTimeMillis();
			m1();
			System.out.println((System.currentTimeMillis()-start)+"ms");//现在时间减去刚运行的时间
			start = System.currentTimeMillis();//保存运行时间
			
			System.out.println("Hello");
			m2();
			System.out.println((System.currentTimeMillis()-start)+"ms");
	}	
	public static void m1() throws InterruptedException{
		Thread.sleep(5000);//暂停五秒
	}
	public static void m2() throws InterruptedException{
		Thread.sleep(3000);//暂停三秒
	}

}
