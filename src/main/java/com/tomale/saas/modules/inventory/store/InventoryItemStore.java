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


public class InventoryItemStore {

    private static final Logger log = LogManager.getLogger(InventoryItemStore.class);

    private static final String SQL_INV_ITEM_ADD = "{? = call inventory.item_add(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
    private static final String SQL_INV_ITEMS_ALL = "{call inventory.items_all()}";

    private final JdbcTemplate jdbc;

    public InventoryItemStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public UUID add(
        UUID clientId,
        String name,
        String description,
        String make,
        String brand,
        String model,
        String version,
        String sku,
        float length,
        float width,
        float height,
        float weight,
        boolean perishable,
        boolean hazardous
    ) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_INV_ITEM_ADD);
            stmt.registerOutParameter(1, java.sql.Types.OTHER);
            stmt.setString(2, name);
            stmt.setString(3, description);
            stmt.setString(4, make);
            stmt.setString(5, brand);
            stmt.setString(6, model);
            stmt.setString(7, version);
            stmt.setString(8, sku);
            stmt.setFloat(9, length);
            stmt.setFloat(10, width);
            stmt.setFloat(11, height);
            stmt.setFloat(12, weight);
            stmt.setBoolean(13, perishable);
            stmt.setBoolean(14, hazardous);
            if (stmt.execute()) {
                String tmp = stmt.getString(1);
                return UUID.fromString(tmp);
            } else {
                throw new Exception("An error occured while trying to add an inventory item (1)");
            }


        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add an inventory item (2)");
        }
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
                String description = rs.getString(3);
                String make = rs.getString(4);
                String brand = rs.getString(5);
                String model = rs.getString(6);
                String version = rs.getString(7);
                String sku = rs.getString(8);
                float length = rs.getFloat(9);
                float width = rs.getFloat(10);
                float height = rs.getFloat(11);
                float weight = rs.getFloat(12);
                boolean perishable = rs.getBoolean(13);
                boolean hazardous = rs.getBoolean(14);

                items.add(new InventoryItem(
                    id, 
                    name,
                    description,
                    make,
                    brand,
                    model,
                    version,
                    sku,
                    length,
                    width,
                    height,
                    weight,
                    perishable,
                    hazardous
                ));
            }
            return items;
        } catch(SQLException e) {
            log.error(e.getMessage());
            throw new Exception("An error occured while trying to retrieve all inventory items");
        }
    }
}