package com.tomale.saas;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.ViewResolver;

import org.jtwig.spring.boot.JtwigAutoConfiguration;
import org.jtwig.spring.JtwigViewResolver;


@SpringBootApplication(
	exclude = {
		JtwigAutoConfiguration.class
	}
)
public class SaasApplication {
	public final static Logger log = LogManager.getLogger(SaasApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SaasApplication.class, args);
	}

	@Bean
	public ViewResolver viewResolver() {
		JtwigViewResolver resolver = new JtwigViewResolver();
		resolver.setPrefix("classpath:/templates/");
		resolver.setSuffix(".html");
		return resolver;
	}
}
