package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;

// import com.tomale.saas.base.models.security.Permission;

import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class DefaultController {

    private final static Logger log = LogManager.getLogger(DefaultController.class);

    @GetMapping("/")
    public String viewDefault() {
        log.debug("VIEW: default");

        return "default";
    }

    @GetMapping("/dashboard")
    public String viewDashboard() {
        log.debug("VIEW: default dashboard");

        return "dashboard";
    }
}