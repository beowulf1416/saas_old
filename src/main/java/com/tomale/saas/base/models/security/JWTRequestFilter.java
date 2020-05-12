package com.tomale.saas.base.models.security;

import java.io.IOException;

import javax.servlet.http.Cookie;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    private final static Logger log = LogManager.getLogger(JWTRequestFilter.class);

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${app.cookie.name}")
    private String cookieName;

    @Value("${app.cipher.key}")
    private String cipherKey;

    @Autowired
    private AuthenticationManager authMgr;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            JWTAuthenticationToken auth = parseAuthToken(request);
            if (auth != null) {       
                Authentication postAuth = authMgr.authenticate(auth);
                SecurityContextHolder.getContext().setAuthentication(postAuth);
            }
        } catch(AuthenticationException e) {
            log.error(e);
        }

        filterChain.doFilter(request, response);
    }

    public JWTAuthenticationToken parseAuthToken(HttpServletRequest request) throws AuthenticationException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equalsIgnoreCase(cookieName)) {
                    String value = cookie.getValue();
                    JWTUtil jwt = new JWTUtil(jwtIssuer, jwtSecret, cipherKey);
                    if (jwt.verify(value)) {
                        try {
                            JsonObject json = jwt.toJSON(value);
                            JWTAuthenticationToken token = new JWTAuthenticationToken(json);
                            return token;
                        } catch(Exception e) {
                            throw new AuthenticationServiceException("Unable to parse cookie", e);
                        }
                    } else {
                        throw new BadCredentialsException("Invalid value for cookie");
                    }
                }
            }
        }
        return null;
    }

}