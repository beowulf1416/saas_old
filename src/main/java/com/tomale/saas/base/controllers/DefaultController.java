package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;

import com.tomale.saas.base.models.ModelAndViewFactory;

// import com.tomale.saas.base.models.security.Permission;

import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class DefaultController {

    private final static Logger log = LogManager.getLogger(DefaultController.class);

    @GetMapping("/")
    public String viewDefault() {
        log.debug("VIEW: default");

        return "default";
    }

    @GetMapping("/dashboard")
    public ModelAndView viewDashboard() {
        return ModelAndViewFactory.get("dashboard");
    }
}