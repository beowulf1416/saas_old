package com.tomale.saas.modules.inventory.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.modules.inventory.store.InventoryTransactionStore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;


@RestController
@RequestMapping("/api/inventory/transactions")
public class RestInventoryTransactionsController {
    
    private static final Logger log = LogManager.getLogger(RestInventoryTransactionsController.class);

    @Autowired
    private InventoryTransactionStore tranStore;

    @PostMapping("/receiving/add")
    @PreAuthorize("hasAuthority('inventory.transactions.receiving.add')")
    public ApiResult addReceiving(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            tranStore.addReceiving();

            return new ApiResult(
                "error",
                "not yet implemented",
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