package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.base.models.Client;
import com.tomale.saas.base.models.SessionUtil;
import com.tomale.saas.base.models.User;
import com.tomale.saas.base.store.ClientStore;
import com.tomale.saas.base.store.PermissionStore;


@RestController
@RequestMapping("/api/clients")
public class RestClientController {

    private static final Logger log = LogManager.getLogger(RestClientController.class);

    @Autowired
    private PermissionStore permissionStore;

    @Autowired
    private ClientStore clientStore;

    @Autowired
    private SessionUtil sessionUtil;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ApiResult all() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();

            Gson gson = new Gson();

            return new ApiResult(
                "success", 
                String.format("%d clients found", clients.size()), 
                gson.toJson(clients)
            );
        } else {
            log.error("Unknown principal: %s", o.toString());
            return new ApiResult(
                "error", 
                "An error occured while trying to process request", 
                null
            );
        }
    }

    @PostMapping("/select")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ApiResult select(@RequestBody Map<String, Object> data, HttpServletResponse response) {
        Object oClientId = data.get("clientId");
        if (oClientId == null) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error", 
                "Client Id is required", 
                null
            );
        }

        UUID clientId = UUID.fromString(oClientId.toString());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();
            Client selectedClient = null;
            for(Client c : clients) {
                if (clientId.equals(c.getId())) {
                    selectedClient = c;
                }
            }

            if (selectedClient == null) {
                response.setStatus(HttpStatus.CONFLICT.value());
                return new ApiResult(
                    "error", 
                    "Selected client not found",
                    null
                );
            } else {
                try {
                    List<String> permissions = permissionStore.userPermissions(
                        user.getId(), 
                        selectedClient.getId()
                    );

                    Cookie cookie = sessionUtil.generateCookie(user, 
                        permissions, 
                        selectedClient, 
                        clients
                    );
                    response.addCookie(cookie);

                    return new ApiResult(
                        "success", 
                        String.format("%s selected", selectedClient.getName()), 
                        null
                    );
                } catch(Exception e) {
                    log.error(e);
                    return new ApiResult(
                        "error",
                        e.getMessage(),
                        null
                    );
                }
            }
        } else {
            log.error("Unknown principal: %s", o.toString());
            return new ApiResult(
                "error", 
                "An error occured while trying to process request", 
                null
            );
        }
    }
}