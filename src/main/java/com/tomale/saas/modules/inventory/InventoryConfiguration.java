package com.tomale.saas.modules.inventory;

import com.tomale.saas.modules.inventory.store.InventoryItemStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;


@Configuration
public class InventoryConfiguration {

    @Autowired
    private JdbcTemplate jdbc;

    @Bean
    public InventoryItemStore inventoryStore() {
        return new InventoryItemStore(jdbc);
    }
}