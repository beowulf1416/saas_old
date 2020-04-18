package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.tomale.saas.base.models.User;


public class JWTUtil {

    private static final Logger log = LogManager.getLogger(JWTUtil.class);

    // expire token in 1 hour
    private static final int JWT_TOKEN_EXPIRE = 60 * 60 * 1000;

    private String issuer;
    // private String secret;
    private Algorithm algorithm;
    private String cipherKey;

    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_PERMISSIONS = "permissions";
    private static final String CLAIM_TOKEN = "token";

    public JWTUtil(String issuer, String secret, String cipherKey) {
        this.issuer = issuer;
        // this.secret = secret;
        this.algorithm = Algorithm.HMAC256(secret);
        this.cipherKey = cipherKey;
    }

    /**
     * generate jwt token
     * store permissions in encrypted form as a claim
     * @param user
     * @param permissions
     * @return
     * @throws Exception
     */
    public String generateToken(User user, List<String> permissions) throws Exception {
        try {
            Instant current = Instant.now();
            Instant expires = current.plus(JWT_TOKEN_EXPIRE, ChronoUnit.MILLIS);
            Date expiry = Date.from(expires);

            Gson gson = new Gson();
            String szPermissions = gson.toJson(permissions);

            CipherUtil cu = new CipherUtil(cipherKey);
            String encodedPermissions = cu.encrypt(szPermissions);

            String token = JWT.create()
                .withIssuer(issuer)
                .withClaim(CLAIM_EMAIL, user.getEmail())
                // .withArrayClaim(CLAIM_PERMISSIONS, permissions.toArray(new String[permissions.size()]))
                .withClaim(CLAIM_PERMISSIONS, encodedPermissions)
                .withExpiresAt(expiry)
                .sign(algorithm);

            return token;
        } catch(JWTCreationException e) {
            log.error(e);
            throw new Exception("An error occured while trying to generate JWT token");
        }
    }

    public boolean verify(String token) {
        log.debug("JWTUtil::verify()");
        try {
            JWTVerifier v = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
            DecodedJWT decoded = v.verify(token);
            log.debug("returning true");
            return true;
        } catch(JWTVerificationException e) {
            log.error(e);
            log.debug("returning false");
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
            json.add("email", new JsonPrimitive(decoded.getClaim(CLAIM_EMAIL).asString()));

            // process secure token (permissions)
            List<String> permissions = new ArrayList<String>();
            Claim cToken = decoded.getClaim(CLAIM_PERMISSIONS);
            if (!cToken.isNull()) {
                CipherUtil cu = new CipherUtil(cipherKey);
                String szPermissions = cu.decrypt(cToken.asString());

                Type type = new TypeToken<List<String>>(){}.getType();

                Gson gson = new Gson();
                permissions = gson.fromJson(szPermissions, type);
            }

            JsonArray ja = new JsonArray();
            for (String permission : permissions) {
                ja.add(new JsonPrimitive(permission));
            }
            json.add("permissions", ja);

            return json;
        } catch(JWTVerificationException e) {
            log.error(e);
            throw new Exception("Unable to decode token to json value");
        }
    }
}