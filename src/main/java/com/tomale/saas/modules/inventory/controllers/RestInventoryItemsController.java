package com.tomale.saas.modules.inventory.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.google.gson.Gson;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.modules.inventory.models.InventoryItem;
import com.tomale.saas.modules.inventory.store.InventoryItemStore;


@RestController
@RequestMapping("/api/inventory/items")
public class RestInventoryItemsController {

    private static final Logger log = LogManager.getLogger(RestInventoryItemsController.class);

    @Autowired
    private InventoryItemStore invStore;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('inventory.admin')")
    public ApiResult all(@RequestBody Map<String, Object> data) {
        try {
            Object o = data.get("clientId");
            if (o == null) {
                return new ApiResult(
                    "error",
                    "Client Id is required",
                    null
                );
            }
            UUID clientId = UUID.fromString(o.toString());
            List<InventoryItem> items = invStore.all(clientId);

            Gson gson = new Gson();
            return new ApiResult(
                "success",
                String.format("%d inventory items", items.size()),
                gson.toJson(items)
            );
        } catch(Exception e) {
            log.error(e);
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('inventory.admin')")
    public ApiResult add(@RequestBody Map<String, Object> data) {
        try {
            Object o = data.get("clientId");
            if (o == null) {
                return new ApiResult(
                    "error",
                    "Client Id is required",
                    null
                );
            }
            String clientId = o.toString();

            o = data.get("id");
            if (o == null) {
                return new ApiResult(
                    "error",
                    "Item Id is required",
                    null
                );
            }
            String itemId = o.toString();

            String name = data.get("name").toString();
            String description = data.get("description").toString();
            String make = data.get("make").toString();
            String brand = data.get("brand").toString();
            String model = data.get("model").toString();
            String version = data.get("version").toString();
            String sku = data.get("sku").toString();
            String upc = data.get("upc").toString();
            float length = Float.valueOf(data.get("length").toString());
            float width = Float.valueOf(data.get("width").toString());
            float height = Float.valueOf(data.get("height").toString());
            float weight = Float.valueOf(data.get("weight").toString());
            boolean perishable = Boolean.valueOf(data.get("perishable").toString());
            boolean hazardous = Boolean.valueOf(data.get("hazardous").toString());

            invStore.update(
                UUID.fromString(clientId),
                UUID.fromString(itemId),
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
            );

            return new ApiResult(
                "success",
                String.format("Item %s update", itemId),
                null
            );
        } catch(Exception e) {
            log.error(e);
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }
}