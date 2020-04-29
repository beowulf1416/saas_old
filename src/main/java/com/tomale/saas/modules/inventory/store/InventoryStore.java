package com.tomale.saas.modules.inventory.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.tomale.saas.modules.inventory.models.InventoryItem;


public class InventoryStore {

    private static final Logger log = LogManager.getLogger(InventoryStore.class);

    private static final String SQL_INV_ITEMS_ALL = "{call inventory.items_all()}";

    private final JdbcTemplate jdbc;

    public InventoryStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<InventoryItem> all() throws Exception {
        try {
            
        } catch(SQLException e) {
            log.error(e.getMessage());
            throws new Exception("An error occured while trying to retrieve all inventory items");
        }
    }
}