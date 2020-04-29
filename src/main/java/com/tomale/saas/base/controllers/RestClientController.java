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

import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.base.store.ClientStore;


@RestController
@RequestMapping("/api/clients")
public class RestClientController {

    private static final Logger log = LogManager.getLogger(RestClientController.class);

    @Autowired
    private ClientStore clientStore;

    @GetMapping("/all")
    @PreAuthorize("hasPermission(#user, 'user.authenticated')")
    public ApiResult all() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.debug(auth.getPrincipal());

        return new ApiResult(
            "success", 
            "list of clients", 
            null
        );
    }
}