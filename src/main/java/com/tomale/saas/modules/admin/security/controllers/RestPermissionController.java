package com.tomale.saas.modules.admin.security.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.modules.admin.security.Permission;
import com.tomale.saas.modules.admin.security.store.AdminPermissionStore;

import com.tomale.saas.base.models.ApiResult;


@RestController
@RequestMapping("/api/admin/security/permissions")
public class RestPermissionController {

    private static final Logger log = LogManager.getLogger(RestPermissionController.class);

    @Autowired
    private AdminPermissionStore adminPermissionStore;

    @PostMapping("/all")
    @PreAuthorize("hasPermission(#user, 'admin.security.permissions')")
    public ApiResult getAllPermissions() {
        try {
            List<Permission> permissions = adminPermissionStore.getPermissions();

            Gson gson = new Gson();

            return new ApiResult(
                "success",
                String.format("%d permissions retrieved", permissions.size()),
                gson.toJson(permissions)
            );
        } catch(Exception e) {
            log.error(e);

            return new ApiResult(
                "error",
                "An error occured while trying to retrieve permissions",
                null
            );
        }
    }
}