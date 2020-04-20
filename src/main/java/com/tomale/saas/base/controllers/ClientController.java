package com.tomale.saas.base.controllers;

import com.tomale.saas.base.models.User;

import java.util.List;

import com.tomale.saas.base.models.Client;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/client")
public class ClientController {

    @GetMapping("/select")
    @PreAuthorize("hasPermission(#user, 'user.authenticated')")
    public ModelAndView viewSelect() {
        ModelAndView mv = new ModelAndView("client/select");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();
            mv.addObject("clients", clients);
        }

        return mv;
    }
}