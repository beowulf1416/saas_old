package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/security")
public class SecurityController {

    private final static Logger log = LogManager.getLogger(SecurityController.class);

    @GetMapping("/signin")
    public String userSignIn() {
        log.debug("VIEW: security.signin");
        return "security/signin";
    }

    @GetMapping("/signout")
    public String userSignOut() {
        log.debug("VIEW: security.signout");
        return "security/signout";
    }

    @GetMapping("/signup")
    public String userSignUp() {
        log.debug("VIEW: security.signup");
        return "security/signup";
    }
}