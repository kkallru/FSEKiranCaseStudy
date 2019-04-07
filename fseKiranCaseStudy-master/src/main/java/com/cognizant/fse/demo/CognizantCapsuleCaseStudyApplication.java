package com.cognizant.fse.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories(basePackages = "com.cognizant.fse.demo.repository")
@SpringBootApplication
public class CognizantCapsuleCaseStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(CognizantCapsuleCaseStudyApplication.class, args);
	}

}
