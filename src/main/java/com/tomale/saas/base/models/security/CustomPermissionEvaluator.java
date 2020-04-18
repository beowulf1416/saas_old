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
        Object o = authentication.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            return user.getPermissions().contains(permission);
        }
        return false;
    }

}