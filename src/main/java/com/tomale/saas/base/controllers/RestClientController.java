package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import com.google.gson.Gson;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.base.models.Client;
import com.tomale.saas.base.models.User;
import com.tomale.saas.base.store.ClientStore;


@RestController
@RequestMapping("/api/clients")
public class RestClientController {

    private static final Logger log = LogManager.getLogger(RestClientController.class);

    @Autowired
    private ClientStore clientStore;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ApiResult all() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();

            Gson gson = new Gson();

            return new ApiResult(
                "success", 
                String.format("%d clients found", clients.size()), 
                gson.toJson(clients)
            );
        } else {
            log.error("Unknown principal: %s", o.toString());
            return new ApiResult(
                "error", 
                "An error occured while trying to process request", 
                null
            );
        }
    }
}