package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import com.tomale.saas.base.models.User;
import com.tomale.saas.base.models.security.JWTAuthenticationToken;
import com.tomale.saas.base.store.PermissionStore;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.tomale.saas.base.models.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller 
@RequestMapping(
    path = "/client",
    produces = MediaType.TEXT_PLAIN_VALUE
)
public class ClientController {

    private final static Logger log = LogManager.getLogger(ClientController.class);

    @Autowired
    private PermissionStore permissionStore;

    @GetMapping("")
    @PreAuthorize("hasPermission(#user, 'user.authenticated')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("client/default");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();
            mv.addObject("clients", clients);
        }

        return mv;
    }

    @GetMapping("/select")
    @PreAuthorize("hasPermission(#user, 'user.authenticated')")
    public ModelAndView viewSelect(
        HttpServletResponse response,
        @RequestParam String client
    ) {
        log.debug(client);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth instanceof JWTAuthenticationToken) {
            User user = (User) auth.getPrincipal();

            log.debug(user);
        }

        ModelAndView mv = new ModelAndView("client/select");
        return mv;
    }
}