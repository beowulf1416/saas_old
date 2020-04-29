package com.tomale.saas.modules.admin.clients.controllers;

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

import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.base.models.Client;
import com.tomale.saas.modules.admin.clients.store.AdminClientStore;


@RestController
@RequestMapping("/api/admin/clients")
public class RestAdminClientController {

    private static final Logger log = LogManager.getLogger(RestAdminClientController.class);

    @Autowired
    private AdminClientStore adminClientStore;

    @PostMapping("/all")
    @PreAuthorize("hasPermission(#user, 'admin.clients')")
    public List<Client> getAllClients() {
        log.debug("RestAdminController::getAllClients()");
        try {
            List<Client> clients = adminClientStore.getAll();
            return clients;
        } catch(Exception e) {
            log.error(e);
            throw new RuntimeException("An error occured while processing the request");
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasPermission(#user, 'admin.clients')")
    public ApiResult addClient(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String name = params.get("name").toString();
            String address = params.get("address").toString();

            UUID clientId = adminClientStore.add(name, address);
            JsonObject json = new JsonObject();
            json.add("clientId", new JsonPrimitive(clientId.toString()));

            return new ApiResult(
                "success",
                "Client added",
                json.toString()
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.BAD_REQUEST.value());

            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }
}