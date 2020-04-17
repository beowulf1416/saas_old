package com.tomale.saas.base.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

import com.tomale.saas.base.models.security.CustomPermissionEvaluator;

@Configuration
public class SecurityConfiguration extends GlobalMethodSecurityConfiguration {

    @Override
	protected MethodSecurityExpressionHandler createExpressionHandler() {
		DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
		handler.setPermissionEvaluator(new CustomPermissionEvaluator());
		return handler;
	}
}