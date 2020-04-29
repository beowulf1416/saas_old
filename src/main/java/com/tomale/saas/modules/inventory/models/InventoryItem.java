package com.tomale.saas.modules.inventory.models;

import java.util.UUID;

import lombok.Data;

@Data
public class InventoryItem {

    private UUID id;
    private String name;

    public InventoryItem(UUID id, String name) {
        this.id = id;
        this.name = name;
    }
}