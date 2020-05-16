package com.tomale.saas.modules.inventory.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.tomale.saas.base.models.ApiResult;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory/categories")
public class RestInventoryCategoriesController {
    
    @PostMapping("/all")
    @PreAuthorize("hasAuthority('inventory.items')")
    public ApiResult getAll(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        return new ApiResult(
            "success",
            "//todo",
            null
        );
        
    }
}