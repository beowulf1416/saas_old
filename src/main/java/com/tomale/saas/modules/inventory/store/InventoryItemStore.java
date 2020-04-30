package com.tomale.saas.modules.inventory.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.tomale.saas.modules.inventory.models.InventoryItem;


public class InventoryItemStore {

    private static final Logger log = LogManager.getLogger(InventoryItemStore.class);

    private static final String SQL_INV_ITEM_ADD = "{? = call inventory.item_add(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
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
        String upc,
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
            stmt.setObject(2, clientId);
            stmt.setString(3, name);
            stmt.setString(4, description);
            stmt.setString(5, make);
            stmt.setString(6, brand);
            stmt.setString(7, model);
            stmt.setString(8, version);
            stmt.setString(9, sku);
            stmt.setString(10, upc);
            stmt.setBigDecimal(11, new BigDecimal(Float.valueOf(length)));
            stmt.setBigDecimal(12, new BigDecimal(Float.valueOf(width)));
            stmt.setBigDecimal(13, new BigDecimal(Float.valueOf(height)));
            stmt.setBigDecimal(14, new BigDecimal(Float.valueOf(weight)));
            // stmt.setFloat(12, width);
            // stmt.setFloat(13, height);
            // stmt.setFloat(14, weight);
            stmt.setBoolean(15, perishable);
            stmt.setBoolean(16, hazardous);
            stmt.execute();

            String tmp = stmt.getString(1);
            return UUID.fromString(tmp);
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
                String name = rs.getString(2);
                String description = rs.getString(3);
                String make = rs.getString(4);
                String brand = rs.getString(5);
                String model = rs.getString(6);
                String version = rs.getString(7);
                String sku = rs.getString(8);
                String upc = rs.getString(9);
                float length = rs.getFloat(10);
                float width = rs.getFloat(11);
                float height = rs.getFloat(12);
                float weight = rs.getFloat(13);
                boolean perishable = rs.getBoolean(14);
                boolean hazardous = rs.getBoolean(15);

                items.add(new InventoryItem(
                    id, 
                    name,
                    description,
                    make,
                    brand,
                    model,
                    version,
                    sku,
                    upc,
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