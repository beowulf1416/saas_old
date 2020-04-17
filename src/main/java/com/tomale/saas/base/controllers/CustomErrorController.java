package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class CustomErrorController implements ErrorController {

    private final static Logger log = LogManager.getLogger(CustomErrorController.class);

    @RequestMapping(
        path = "/error",
        produces = MediaType.TEXT_HTML_VALUE
    )
    public ModelAndView errorHTML() {
        log.debug("CustomErrorController::errorHTML()");
        ModelAndView mv = new ModelAndView("errors/404");
        return mv;
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
    
}