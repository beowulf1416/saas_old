package com.tomale.saas.modules.inventory.controllers;

import org.apache.logging.log4j.Logger;

import com.tomale.saas.base.models.ModelAndViewFactory;

import org.apache.logging.log4j.LogManager;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/inventory/transactions")
public class InventoryTransactionsController {
    
    private final static Logger log = LogManager.getLogger(InventoryTransactionsController.class);

    @GetMapping("/receiving")
    @PreAuthorize("hasAuthority('inventory.transactions/receiving')")
    public ModelAndView viewDefault() {
        return ModelAndViewFactory.get("inventory/receiving");
    }
}