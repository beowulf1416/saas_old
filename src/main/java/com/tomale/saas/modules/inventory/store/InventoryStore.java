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


public class InventoryStore {

    private static final Logger log = LogManager.getLogger(InventoryStore.class);

    private final JdbcTemplate jdbc;

    public InventoryStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
}