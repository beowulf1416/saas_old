package com.tomale.saas.modules.inventory.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.tomale.saas.base.models.ModelAndViewFactory;


@Controller
@RequestMapping("/inventory")
public class InventoryController {

    private final static Logger log = LogManager.getLogger(InventoryController.class);

    @GetMapping("")
    @PreAuthorize("hasAuthority('inventory.dashboard')")
    public ModelAndView viewDefault() {
        return ModelAndViewFactory.get("inventory/default");
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('inventory.dashboard')")
    public ModelAndView viewDashboard() {
        return ModelAndViewFactory.get("inventory/default");
    }

    @GetMapping("/items")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ModelAndView viewItems() {
        ModelAndView mv = ModelAndViewFactory.get("inventory/items");
        return mv;
    }

    @GetMapping("/items/{id}")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ModelAndView viewItem(@PathVariable String id) {
        ModelAndView mv = ModelAndViewFactory.get("inventory/item");
        mv.addObject("id", id);
        return mv;
    }

    @GetMapping("/categories")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ModelAndView viewCategories() {
        return ModelAndViewFactory.get("inventory/categories");
    }


    @GetMapping("/uom")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ModelAndView viewUOM() {
        return ModelAndViewFactory.get("inventory/uom");
    }
}