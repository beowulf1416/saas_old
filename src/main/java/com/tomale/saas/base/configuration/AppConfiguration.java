package com.tomale.saas.base.configuration;

import com.tomale.saas.base.store.UserStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class AppConfiguration {

    @Autowired
    private JdbcTemplate jdbc;

    @Bean
    public UserStore userStore() {
        return new UserStore(jdbc);
    }
}