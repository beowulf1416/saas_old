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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.modules.inventory.models.InventoryItem;
import com.tomale.saas.modules.inventory.store.InventoryItemStore;


@RestController
@RequestMapping("/api/inventory/items")
public class RestInventoryItemsController {

    private static final Logger log = LogManager.getLogger(RestInventoryItemsController.class);

    @Autowired
    private InventoryItemStore invStore;

    Gson gson = new Gson();


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

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('inventory.admin')")
    public ApiResult add(@RequestBody Map<String, Object> data) {
        try {
            Object o = data.get("clientId");
            if (o == null) {
                throw new Exception("Client Id is required");
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

    @PostMapping("/filter")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ApiResult viewItems(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            Object o = params.get("clientId");
            if (o == null) {
                throw new Exception("Client Id is required");
            }
            UUID clientId = UUID.fromString(o.toString());

            o = params.get("filter");
            String filter = o == null ? "" : o.toString();
            
            List<InventoryItem> items = new ArrayList<InventoryItem>();
            if (filter == "") {
                items = invStore.all(clientId);
            } else {
                items = invStore.itemsByName(clientId, filter);
            }

            HashMap<String, Object> results = new HashMap<String, Object>();
            results.put("items", items);
            results.put("filter", filter);

            return new ApiResult(
                "success",
                String.format("%d items", items.size()),
                gson.toJson(results)
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
    @PreAuthorize("hasAuthority('inventory.items')")
    public ApiResult itemAdd(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            Object o = params.get("clientId");
            if (o == null) {
                throw new Exception("Client Id is required");
            }
            UUID clientId = UUID.fromString(o.toString());

            o = params.get("item");
            if (o == null) {
                throw new Exception("Item is required");
            }

            if (o instanceof HashMap<?, ?>) {
                // TODO: unchecked cast from object to hashmap
                HashMap<String, String> item = (HashMap<String, String>) o;

                String name = item.get("name");
                String description = item.get("description");
                String make = item.get("make");
                String brand = item.get("brand");
                String model = item.get("model");
                String version = item.get("version");
                String sku = item.get("sku");
                String upc = item.get("sku");

                float length = Float.parseFloat(item.get("length"));
                float width = Float.parseFloat(item.get("width"));
                float height = Float.parseFloat(item.get("height"));
                float weight = Float.parseFloat(item.get("weight"));

                boolean perishable = Boolean.parseBoolean(item.get("perishable"));
                boolean hazardous = Boolean.parseBoolean(item.get("hazardous"));

                UUID itemId = invStore.add(clientId,
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
                    "New item added",
                    null
                );
            } else {
                return new ApiResult(
                    "error",
                    "item argument is incorrect",
                    null
                );
            }
        } catch(Exception e) {
            log.error(e);
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/get")
    @PreAuthorize("hasAuthority('inventory.items)")
    public ApiResult itemById(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            Object o = params.get("itemId");
            if (o == null) {
                throw new Exception("Item Id is required");
            }
            UUID itemId = UUID.fromString(o.toString());

            InventoryItem item = invStore.itemById(itemId);
            return ApiResult(
                "success",
                "inventory item found",
                gson.toJson(item)
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