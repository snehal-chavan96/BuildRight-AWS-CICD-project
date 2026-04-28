package com.buildright;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuildrightApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuildrightApplication.class, args);
        System.out.println("Hello Owner!!");
	}

}
