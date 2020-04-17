package com.tomale.saas.base.models.security;

import java.io.Serializable;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;


public class CustomPermissionEvaluator implements PermissionEvaluator {

    private final static Logger log = LogManager.getLogger(CustomPermissionEvaluator.class);

    @Override
    public boolean hasPermission(
        Authentication authentication, 
        Object targetDomainObject, 
        Object permission
        ) {
        
        log.debug("CustomPermissionEvaluator::hasPermission() {1}");
        log.debug(authentication);
        log.debug(targetDomainObject);
        log.debug(permission);

        return false;
    }

    @Override
    public boolean hasPermission(
        Authentication authentication, 
        Serializable targetId, 
        String targetType,
        Object permission
        ) {
        
        log.debug("CustomPermissionEvaluator::hasPermission() {2}");
        log.debug(authentication);
        log.debug(targetType);
        log.debug(permission);

        return false;
    }

}