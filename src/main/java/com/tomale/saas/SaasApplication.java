package com.tomale.saas;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;


@SpringBootApplication
@EnableGlobalMethodSecurity(
	// securedEnabled = true,
	prePostEnabled = true
)
public class SaasApplication {
	public final static Logger log = LogManager.getLogger(SaasApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SaasApplication.class, args);
	}
}
