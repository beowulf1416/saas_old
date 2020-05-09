package com.tomale.saas.base.models;

import com.tomale.saas.base.models.security.JWTAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.ModelAndView;

public class ModelAndViewFactory {
    
    public static ModelAndView get(String viewName) {
        ModelAndView mv = new ModelAndView(viewName);

        // set common variables
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth instanceof JWTAuthenticationToken) {
            User user = (User) auth.getPrincipal();
            mv.addObject("user", user);
        }

        return mv;
    }
}