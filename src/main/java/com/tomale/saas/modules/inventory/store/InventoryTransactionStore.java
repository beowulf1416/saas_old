package com.tomale.saas.modules.inventory.store;

import org.apache.logging.log4j.Logger;
import org.apache.commons.lang3.NotImplementedException;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;


public class InventoryTransactionStore {

    private static final Logger log = LogManager.getLogger(InventoryTransactionStore.class);

    private JdbcTemplate jdbc;

    public InventoryTransactionStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addReceiving() throws Exception {
        throw new NotImplementedException("//TODO");
    }
}