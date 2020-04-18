package com.tomale.saas.base.models.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import com.tomale.saas.base.models.User;


public class JWTAuthenticationToken extends AbstractAuthenticationToken {

	private static final long serialVersionUID = -2550185165626007488L;
	
	private static final String ELEM_EMAIL = "email";
	private static final String ELEM_PERMISSIONS = "permissions";

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
		String name = "";
		String email = json.get(ELEM_EMAIL).getAsString();
		JsonArray ja = json.get(ELEM_PERMISSIONS).getAsJsonArray();
		ArrayList<String> permissions = new ArrayList<String>();
		for (JsonElement je : ja) {
			permissions.add(je.getAsString());			
		}

		User user = new User(name, email);
		user.setPermissions(permissions);

		return user;
	}


}