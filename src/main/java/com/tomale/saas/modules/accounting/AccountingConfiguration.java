package com.tomale.saas.modules.accounting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class AccountingConfiguration {
    
    @Autowired
    private JdbcTemplate jdbc;
}