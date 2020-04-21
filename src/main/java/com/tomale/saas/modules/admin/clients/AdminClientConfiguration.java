package com.tomale.saas.modules.admin.clients;

import com.tomale.saas.modules.admin.clients.store.AdminClientStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;


@Configuration
public class AdminClientConfiguration {

    @Autowired
    private JdbcTemplate jdbc;

    @Bean
    public AdminClientStore adminClientStore() {
        return new AdminClientStore(jdbc);
    }
}