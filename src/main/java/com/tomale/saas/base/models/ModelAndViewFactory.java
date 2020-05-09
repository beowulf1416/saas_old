package com.tomale.saas.base.models;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.http.HttpServletRequest;

import com.tomale.saas.base.models.security.JWTAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

public class ModelAndViewFactory {
    
    private final static Logger log = LogManager.getLogger(ModelAndViewFactory.class);

    public static ModelAndView get(String viewName) {
        ModelAndView mv = new ModelAndView(viewName);

        // set common variables
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth instanceof JWTAuthenticationToken) {
            User user = (User) auth.getPrincipal();
            mv.addObject("user", user);
        }

        RequestAttributes reqAttribs = RequestContextHolder.currentRequestAttributes();
        if (reqAttribs instanceof ServletRequestAttributes) {
            ServletRequestAttributes srAttribs = (ServletRequestAttributes) reqAttribs;
            mv.addObject("request_uri", srAttribs.getRequest().getRequestURI());
        }

        return mv;
    }
}