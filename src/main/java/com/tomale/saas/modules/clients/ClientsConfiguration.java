package com.tomale.saas.modules.clients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;


@Configuration
public class ClientsConfiguration {

    @Autowired
    private JdbcTemplate jdbc;
}