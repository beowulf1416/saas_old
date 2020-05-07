package com.tomale.saas.modules.gis.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/gis")
public class GisController {

    public final static Logger log = LogManager.getLogger(GisController.class);

    @GetMapping("")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ModelAndView viewDefault() {
        return new ModelAndView("gis/default");
    }
}