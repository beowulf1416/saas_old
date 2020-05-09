package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import com.tomale.saas.base.models.User;
import com.tomale.saas.base.store.UserStore;
import com.tomale.saas.base.models.Client;


public class JWTAuthenticationToken extends AbstractAuthenticationToken {

	private static final Logger log = LogManager.getLogger(JWTAuthenticationToken.class);

	private static final long serialVersionUID = -2550185165626007488L;
	
	private static final String ELEM_EMAIL = "email";
	private static final String ELEM_PERMISSIONS = "permissions";
	private static final String ELEM_CLIENTS = "clients";
	private static final String ELEM_CLIENT_CURRENT = "client_current";

	private JsonObject json;
	private User user;


    public JWTAuthenticationToken(JsonObject json) {
		super(populateAuthorities(json));
		this.json = json;
		this.user = parseUser(json);
	}
	
	private static Collection<GrantedAuthority> populateAuthorities(JsonObject json) {
		JsonArray ja = json.get(ELEM_PERMISSIONS).getAsJsonArray();
		Collection<GrantedAuthority> permissions = new ArrayList<GrantedAuthority>();
		for (JsonElement je : ja) {
			permissions.add(new GrantedAuthorityPermission(je.getAsString()));
		}
		return permissions;
	}

	private User parseUser(JsonObject json) {
		String name = "";
		String email = json.get(ELEM_EMAIL).getAsString();

		JsonArray ja = json.get(ELEM_PERMISSIONS).getAsJsonArray();
		ArrayList<String> permissions = new ArrayList<String>();
		for (JsonElement je : ja) {
			permissions.add(je.getAsString());
		}

		JsonArray jClients = json.get(ELEM_CLIENTS).getAsJsonArray();
		ArrayList<Client> clients = new ArrayList<Client>();
		for (JsonElement elem: jClients) {
			JsonObject obj = (JsonObject) elem;
			String id = obj.get("id").getAsString();
			String clientName = obj.get("value").getAsString();
			clients.add(new Client(UUID.fromString(id), true, clientName, ""));
		}

		JsonObject o = (JsonObject) json.get(ELEM_CLIENT_CURRENT);
		String clientId = o.get("id").getAsString();
		String clientName = o.get("value").getAsString();

		User user = new User(name, email);
		user.setPermissions(permissions);
		user.setClients(clients);
		user.setCurrentClient(new Client(UUID.fromString(clientId), true, clientName, ""));

		return user;

	}

	@Override
	public Object getCredentials() {
		return user;
	}

	@Override
	public Object getPrincipal() {
		return user;
	}
}