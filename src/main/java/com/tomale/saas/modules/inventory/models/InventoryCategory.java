package com.tomale.saas.modules.inventory.models;

import java.util.UUID;

import lombok.Data;

@Data
public class InventoryCategory {
    
    private UUID id;
    private boolean active;
    private String name;

    public InventoryCategory(UUID id, boolean active, String name) {
        this.id = id;
        this.active = active;
        this.name = name;
    }
}