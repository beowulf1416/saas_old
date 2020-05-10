package com.tomale.saas.modules.accounting.controllers;

import com.tomale.saas.base.models.ModelAndViewFactory;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/accounting")
public class AccountingController {
    
    @GetMapping("")
    @PreAuthorize("hasAuthority('accounting.default)")
    public ModelAndView viewDefault() {
        return ModelAndViewFactory.get("accounting/default");
    }
}