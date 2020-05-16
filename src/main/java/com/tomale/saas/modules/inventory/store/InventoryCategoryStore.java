package com.tomale.saas.modules.inventory.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;


public class InventoryCategoryStore {
    
    private static final Logger log = LogManager.getLogger(InventoryCategoryStore.class);

    private static final String SQL_INV_CATEGORY_ALL = "{call inventory.categories_all(?)}";

    private final JdbcTemplate jdbc;

    public InventoryCategoryStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }


}