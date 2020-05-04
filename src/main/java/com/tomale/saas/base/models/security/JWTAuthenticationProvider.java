package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

// import org.springframework.beans.factory.annotation.Value;

@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {

    // @Value("${jwt.issuer}")
    // private String jwtIssuer;

    // @Value("${jwt.secret}")
    // private String jwtSecret;

    // @Value("${app.cookie.name}")
    // private String cookieName;

    // @Value("${app.cipher.key}")
    // private String cipherKey;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        authentication.setAuthenticated(true);
        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JWTAuthenticationToken.class);
    }
    
}