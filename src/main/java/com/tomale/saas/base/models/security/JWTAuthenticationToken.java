package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.UUID;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import com.tomale.saas.base.models.User;
import com.tomale.saas.base.models.Client;


public class JWTAuthenticationToken extends AbstractAuthenticationToken {

	private static final Logger log = LogManager.getLogger(JWTAuthenticationToken.class);

	private static final long serialVersionUID = -2550185165626007488L;
	
	private static final String ELEM_EMAIL = "email";
	private static final String ELEM_PERMISSIONS = "permissions";
	private static final String ELEM_CLIENTS = "clients";

	private JsonObject json;

    public JWTAuthenticationToken(JsonObject json) {
		super(new ArrayList<GrantedAuthority>());
		
		this.json = json;
    }

	@Override
	public Object getCredentials() {
		log.debug("JWTAuthenticationToken::getCredentials()");
		return null;
	}

	@Override
	public Object getPrincipal() {
		// log.debug("JWTAuthenticationToken::getPrincipal()");
		String name = "";
		String email = json.get(ELEM_EMAIL).getAsString();
		JsonArray ja = json.get(ELEM_PERMISSIONS).getAsJsonArray();
		ArrayList<String> permissions = new ArrayList<String>();
		for (JsonElement je : ja) {
			permissions.add(je.getAsString());
		}

		// log.debug(json.get(ELEM_CLIENTS));

		JsonArray jClients = json.get(ELEM_CLIENTS).getAsJsonArray();
		ArrayList<Client> clients = new ArrayList<Client>();
		for (JsonElement elem: jClients) {
			JsonObject obj = (JsonObject) elem;
			String id = obj.get("id").getAsString();
			String clientName = obj.get("value").getAsString();
			clients.add(new Client(UUID.fromString(id), clientName, ""));
		}

		User user = new User(name, email);
		user.setPermissions(permissions);
		user.setClients(clients);

		return user;
	}


}