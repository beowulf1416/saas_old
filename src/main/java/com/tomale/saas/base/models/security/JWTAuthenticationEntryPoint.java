package com.tomale.saas.base.models.security;

import java.io.IOException;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final static Logger log = LogManager.getLogger(JWTAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        log.debug("JWTAuthenticationEntryPoint");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }

}