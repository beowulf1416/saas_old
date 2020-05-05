package com.tomale.saas.base.models;

import java.util.List;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Value;

import com.tomale.saas.base.models.security.JWTUtil;


public class SessionUtil {
    
    private String jwtIssuer;
    private String jwtSecret;
    private String cookieName;
    private String cookieDomain;
    private boolean cookieSecure;
    private int cookieMaxAge;
    private String cipherKey;

    public SessionUtil(
        String jwtIssuer, 
        String jwtSecret, 
        String cipherKey,
        String cookieName,
        String cookieDomain,
        boolean cookieSecure,
        int cookieMaxAge
    ) {
        this.jwtIssuer = jwtIssuer;
        this.jwtSecret = jwtSecret;
        this.cipherKey = cipherKey;
        this.cookieName = cookieName;
        this.cookieDomain = cookieDomain;
        this.cookieSecure = cookieSecure;
        this.cookieMaxAge = cookieMaxAge;
    }


    public Cookie generateCookie(
        User user, 
        List<String> permissions, 
        Client currentClient, 
        List<Client> clients
    ) throws Exception {
        JWTUtil jwt = new JWTUtil(jwtIssuer, jwtSecret, cipherKey);
        String token = jwt.generateToken(user, permissions, currentClient, clients);

        Cookie cookie = new Cookie(cookieName, token);
        cookie.setDomain(cookieDomain);
        cookie.setSecure(cookieSecure);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(cookieMaxAge);
        return cookie;
    }
}