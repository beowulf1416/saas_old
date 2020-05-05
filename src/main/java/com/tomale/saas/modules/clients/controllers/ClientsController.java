package com.tomale.saas.modules.clients.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;



@Controller
@RequestMapping(
    path = "/clients",
    produces = MediaType.TEXT_HTML_VALUE,
    method = RequestMethod.GET
)
public class ClientsController {

    private static final Logger log = LogManager.getLogger(ClientsController.class);
    
    
    @GetMapping("")
    @PreAuthorize("hasAuthority('clients.admin')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("clients/default");
        return mv;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('clients.admin.users')")
    public ModelAndView viewUsers() {
        ModelAndView mv = new ModelAndView("clients/users");
        return mv;
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('clients.admin.roles')")
    public ModelAndView viewRoles() {
        ModelAndView mv = new ModelAndView("clients/roles");
        return mv;
    }
}