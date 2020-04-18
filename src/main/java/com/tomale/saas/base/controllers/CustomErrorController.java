package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

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
    public ModelAndView errorHTML(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        HttpStatus value = HttpStatus.valueOf((int) status);

        ModelAndView mv = new ModelAndView();

        switch(value) {
            case FORBIDDEN: {
                mv.setViewName("errors/403");
                break;
            }
            case NOT_FOUND: {
                mv.setViewName("errors/404");
                break;
            }
            default: {
                log.warn("Unknown error status code: %s", status.toString());
                mv.setViewName("errors/unknown");
                break;
            }
        }

        mv.addObject("status", status);

        return mv;
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
    
}