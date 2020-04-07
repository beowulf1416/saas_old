package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.Logger;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.tomale.saas.base.models.User;

import org.apache.logging.log4j.LogManager;


public class JWTUtil {

    private static final Logger log = LogManager.getLogger(JWT.class);

    private String issuer;
    private String secret;

    public JWTUtil(String issuer, String secret) {
        this.issuer = issuer;
        this.secret = secret;
    }

    public void generateToken(User user) throws Exception {
        try {
            Algorithm algo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer(issuer)
                .sign(algo);
        } catch(JWTCreationException e) {
            log.error(e);
            throw new Exception("An error occured while trying to generate JWT token");
        }
    }
}