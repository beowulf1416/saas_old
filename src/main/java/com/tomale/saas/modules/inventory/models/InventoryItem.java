package com.tomale.saas.modules.inventory.models;

import java.util.UUID;

import lombok.Data;

@Data
public class InventoryItem {

    private UUID id;
    private String name;
    private String description;
    private String make;
    private String brand;
    private String model;
    private String version;
    private String sku;
    private float length;
    private float width;
    private float height;
    private float weight;
    private boolean perishable;
    private boolean hazardous;


    public InventoryItem(
        UUID id, 
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
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.model = model;
        this.version = version;
        this.sku = sku;
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.perishable = perishable;
        this.hazardous = hazardous;
    }
}