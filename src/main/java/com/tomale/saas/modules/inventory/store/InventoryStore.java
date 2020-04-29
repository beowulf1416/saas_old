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
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_INV_ITEMS_ALL);
            stmt.execute();

            ResultSet rs = stmt.getResultSet();
            ArrayList<InventoryItem> items = new ArrayList<InventoryItem>();
            while(rs.next()) {
                UUID id = UUID.fromString(rs.getString(1));
                // boolean active = rs.getBoolean(2);
                String name = rs.getString(2);

                items.add(new InventoryItem(id, name));
            }
            return items;
        } catch(SQLException e) {
            log.error(e.getMessage());
            throw new Exception("An error occured while trying to retrieve all inventory items");
        }
    }
}