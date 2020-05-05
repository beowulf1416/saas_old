package com.tomale.saas.base.configuration;

import com.tomale.saas.base.models.SessionUtil;
import com.tomale.saas.base.store.ClientStore;
import com.tomale.saas.base.store.PermissionStore;
import com.tomale.saas.base.store.UserStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class AppConfiguration {

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${app.cookie.name}")
    private String cookieName;

    @Value("${app.cookie.domain}")
    private String cookieDomain;

    @Value("${app.cookie.secure}")
    private boolean cookieSecure;

    @Value("${app.cookie.max_age}")
    private int cookieMaxAge;

    @Value("${app.cipher.key}")
    private String cipherKey;


    @Autowired
    private JdbcTemplate jdbc;

    @Bean
    public UserStore userStore() {
        return new UserStore(jdbc);
    }

    @Bean
    public PermissionStore permissionStore() {
        return new PermissionStore(jdbc);
    }

    @Bean
    public ClientStore clientStore() {
        return new ClientStore(jdbc);
    }

    @Bean
    public SessionUtil sessionUtil() {
        return new SessionUtil(
            jwtIssuer, 
            jwtSecret, 
            cipherKey,
            cookieName,
            cookieDomain,
            cookieSecure,
            cookieMaxAge
        );
    }
}