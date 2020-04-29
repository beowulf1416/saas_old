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
import com.tomale.saas.modules.inventory.store.InventoryStore;


@RestController
@RequestMapping("/api/inventory/items")
public class RestInventoryItemsController {

    private static final Logger log = LogManager.getLogger(RestInventoryItemsController.class);

    @Autowired
    private InventoryStore invStore;

    @GetMapping("/all")
    @PreAuthorize("hasPermission(#user, 'inventory.admin')")
    public ApiResult all() {
        try {
            List<InventoryItem> items = invStore.all();

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
}