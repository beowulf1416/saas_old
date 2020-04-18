package com.tomale.saas.modules.admin.security.controllers;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(
    path = "/admin/security/permissions",
    produces = MediaType.TEXT_HTML_VALUE,
    method = RequestMethod.GET
)
public class PermissionController {

    @GetMapping("")
    @PreAuthorize("hasPermission(#user, 'admin.security.permissions')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("admin/security/permissions/default");
        return mv;
    }

}