package com.tomale.saas.base.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/account")
public class AccountProfileController {


    @GetMapping("")
    @PreAuthorize("hasPermission(#user, 'security.default')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("profile/default");
        return mv;
    }
}