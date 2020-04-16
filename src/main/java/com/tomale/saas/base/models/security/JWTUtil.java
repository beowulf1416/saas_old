package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.Logger;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.tomale.saas.base.models.User;

import org.apache.logging.log4j.LogManager;


public class JWTUtil {

    private static final Logger log = LogManager.getLogger(JWT.class);

    // expire token in 1 hour
    private static final int JWT_TOKEN_EXPIRE = 60 * 60 * 1000;

    private String issuer;
    // private String secret;
    private Algorithm algorithm;

    public JWTUtil(String issuer, String secret) {
        this.issuer = issuer;
        // this.secret = secret;
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String generateToken(User user) throws Exception {
        try {
            Instant current = Instant.now();
            Instant expires = current.plus(JWT_TOKEN_EXPIRE, ChronoUnit.MILLIS);
            Date expiry = Date.from(expires);

            String token = JWT.create()
                .withIssuer(issuer)
                .withClaim("email", user.getEmail())
                .withExpiresAt(expiry)
                .sign(algorithm);

            return token;
        } catch(JWTCreationException e) {
            log.error(e);
            throw new Exception("An error occured while trying to generate JWT token");
        }
    }

    public boolean verify(String token) {
        try {
            JWTVerifier v = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
            DecodedJWT decoded = v.verify(token);
            return true;
        } catch(JWTVerificationException e) {
            log.error(e);
            return false;
        }
    }

    public JsonObject toJSON(String token) throws Exception {
        try {
            JWTVerifier v = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
            DecodedJWT decoded = v.verify(token);
            
            JsonObject json = new JsonObject();
            json.add("issuer", new JsonPrimitive(decoded.getIssuer()));
            json.add("expires", new JsonPrimitive(decoded.getExpiresAt().toInstant().getEpochSecond()));
            json.add("email", new JsonPrimitive(decoded.getClaim("email").asString()));

            return json;
        } catch(JWTVerificationException e) {
            log.error(e);
            throw new Exception("Unable to decode token to json value");
        }
    }
}