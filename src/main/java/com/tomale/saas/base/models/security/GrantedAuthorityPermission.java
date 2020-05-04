package com.tomale.saas.base.models.security;

import org.springframework.security.core.GrantedAuthority;

public class GrantedAuthorityPermission implements GrantedAuthority {
 
    private String permission;

    public GrantedAuthorityPermission(String permission) {
        this.permission = permission;
    }

    @Override
    public String getAuthority() {
        return this.permission;
    }
    
}