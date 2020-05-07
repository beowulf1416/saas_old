package com.tomale.saas.modules.admin.clients.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import com.tomale.saas.base.models.Client;
import com.tomale.saas.modules.admin.clients.store.AdminClientStore;


@Controller
@RequestMapping(
    path = "/admin/clients",
    produces = MediaType.TEXT_HTML_VALUE,
    method = RequestMethod.GET
)
public class AdminClientController {

    private static final Logger log = LogManager.getLogger(AdminClientController.class);

    @Autowired
    private AdminClientStore adminClientStore;

    @GetMapping("")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ModelAndView viewDefault() {
        log.debug("AdminClientController::viewDefault()");
        try {
            ModelAndView mv = new ModelAndView("admin/clients/default");

            return mv;
        } catch(Exception e) {
            log.error(e);
            throw new RuntimeException("An error occured while processing this request");
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ModelAndView viewClientUsers() {
        return new ModelAndView("admin/clients/users");
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ModelAndView viewClientRoles() {
        return new ModelAndView("admin/clients/roles");
    }
}