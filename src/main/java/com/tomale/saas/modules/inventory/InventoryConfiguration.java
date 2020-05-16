package com.tomale.saas.modules.inventory;

import com.tomale.saas.modules.inventory.store.InventoryCategoryStore;
import com.tomale.saas.modules.inventory.store.InventoryItemStore;
import com.tomale.saas.modules.inventory.store.InventoryTransactionStore;

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

    @Bean
    public InventoryTransactionStore inventoryTransactionStore() {
        return new InventoryTransactionStore(jdbc);
    }

    @Bean
    public InventoryCategoryStore inventoryCategoryStore() {
        return new InventoryCategoryStore(jdbc);
    }
}