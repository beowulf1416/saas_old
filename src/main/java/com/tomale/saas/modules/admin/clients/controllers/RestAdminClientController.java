package com.tomale.saas.modules.admin.clients.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import com.tomale.saas.base.models.Client;
import com.tomale.saas.modules.admin.clients.store.AdminClientStore;


@RestController
@RequestMapping("/api/admin/clients")
public class RestAdminClientController {

    private static final Logger log = LogManager.getLogger(RestAdminClientController.class);

    @Autowired
    private AdminClientStore adminClientStore;

    @PostMapping("/test")
    public String test() {
        return "test";
    }

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
}