package com.tomale.saas.base.models.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;

import com.google.gson.JsonObject;


public class JWTAuthenticationToken extends AbstractAuthenticationToken {

    private static final long serialVersionUID = -2550185165626007488L;

	private JsonObject json;

    public JWTAuthenticationToken(JsonObject json) {
		super(new ArrayList<GrantedAuthority>());
		
		this.json = json;
    }

	@Override
	public Object getCredentials() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		
		return null;
	}


}