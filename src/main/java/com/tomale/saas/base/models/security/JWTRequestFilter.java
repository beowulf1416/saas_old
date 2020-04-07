package com.tomale.saas.base.models.security;

import java.io.IOException;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    private final static Logger log = LogManager.getLogger(JWTRequestFilter.class);

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        log.debug("JWTRequestFilter");
        log.debug(header);

        JWTUtil jwt = new JWTUtil(jwtIssuer, jwtSecret);

        filterChain.doFilter(request, response);
    }

}