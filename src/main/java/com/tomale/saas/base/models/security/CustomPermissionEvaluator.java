package com.tomale.saas.base.models.security;

import java.io.Serializable;

import com.tomale.saas.base.models.User;

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
        return isAllowed(authentication, permission.toString());
    }

    @Override
    public boolean hasPermission(
        Authentication authentication, 
        Serializable targetId, 
        String targetType,
        Object permission
        ) {
        return isAllowed(authentication, permission.toString());
    }

    /**
     * checks if user has the specified permission
     * @param authentication
     * @param permission
     * @return
     */
    private boolean isAllowed(Authentication authentication, String permission) {
        // log.debug("CustomPermissionEvaluator::isAllowed()");
        Object o = authentication.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            boolean value = user.getPermissions().contains(permission);
            log.debug(String.format("CustomPermissionEvaluator::isAllowed() returning %b", value));
            return value;
        }
        log.debug("CustomPermissionEvaluator::isAllowed() returning false");
        return false;
    }

}