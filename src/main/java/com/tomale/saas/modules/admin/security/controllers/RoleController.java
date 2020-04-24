package com.tomale.saas.modules.admin.security.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping(
    path = "/admin/security/roles",
    produces = MediaType.TEXT_HTML_VALUE,
    method = RequestMethod.GET
)
public class RoleController {

    private final static Logger log = LogManager.getLogger(RoleController.class);

    @GetMapping("")
    @PreAuthorize("hasPermission(#user, 'admin.security.roles')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("admin/security/roles/default");
        return mv;
    }
}