package com.tomale.saas.modules.admin.clients.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.tomale.saas.base.models.ApiResult;
import com.tomale.saas.base.models.Client;
import com.tomale.saas.base.models.User;
import com.tomale.saas.modules.admin.clients.store.AdminClientStore;
import com.tomale.saas.modules.admin.security.Permission;
import com.tomale.saas.modules.admin.security.Role;
import com.tomale.saas.modules.admin.security.store.AdminPermissionStore;
import com.tomale.saas.modules.admin.security.store.AdminRoleStore;
import com.tomale.saas.modules.admin.security.store.AdminUsersStore;
import com.tomale.saas.base.store.UserStore;


@RestController
@RequestMapping("/api/admin/clients")
public class RestAdminClientController {

    private static final Logger log = LogManager.getLogger(RestAdminClientController.class);

    @Autowired
    private AdminClientStore adminClientStore;

    @Autowired
    private UserStore userStore;

    @Autowired
    private AdminUsersStore adminUserStore;

    @Autowired
    private AdminPermissionStore adminPermissionStore;

    @Autowired
    private AdminRoleStore adminRoleStore;

    private Gson gson = new Gson();


    @PostMapping("/all")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult getAllClients(HttpServletResponse response) {
        log.debug("RestAdminController::getAllClients()");
        try {
            List<Client> clients = adminClientStore.getAll();
            return new ApiResult(
                "success",
                String.format("%d clients", clients.size()),
                gson.toJson(clients)
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

            return new ApiResult(
                "error",
                "An error occured while processing the request",
                null
            );
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult addClient(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String name = params.get("name").toString();
            String address = params.get("address").toString();

            UUID clientId = adminClientStore.add(name, address);
            JsonObject json = new JsonObject();
            json.add("clientId", new JsonPrimitive(clientId.toString()));

            return new ApiResult(
                "success",
                "Client added",
                json.toString()
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/active")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult setActive(@ResponseBody Map<String, Object> params, HttpServletResponse response) {
        try {

        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/permissions")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult clientPermissions(HttpServletResponse response) {
        try {
            List<Permission> permissions = adminPermissionStore.getPermissions();

            return new ApiResult(
                "success", 
                String.format("%d permissions", permissions.size()), 
                gson.toJson(permissions)
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/permissions/active")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult permissionSetActive(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szPermissionId = params.get("permissionId").toString();
            String szActive = params.get("active").toString();

            adminPermissionStore.permissionSetActive(
                Integer.parseInt(szPermissionId),
                Boolean.parseBoolean(szActive)
            );
            
            return new ApiResult(
                "success",
                "user active status updated",
                null
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/users")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult allUsers(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            List<User> users = adminClientStore.getAllUsers(UUID.fromString(szClientId));

            return new ApiResult(
                "success", 
                String.format("%d users", users.size()), 
                gson.toJson(users)
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/roles")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult allRoles(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            List<Role> roles = adminClientStore.getAllRoles(UUID.fromString(szClientId));

            return new ApiResult(
                "success", 
                String.format("%d roles", roles.size()), 
                gson.toJson(roles)
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/roles/add")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult addRole(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String roleName = params.get("roleName").toString();

            adminClientStore.addRole(
                UUID.fromString(szClientId),
                roleName
            );

            return new ApiResult(
                "success",
                "role added",
                null
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/roles/active")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult roleSetActive(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szRoleId = params.get("roleId").toString();
            String szActive = params.get("active").toString();

            adminRoleStore.roleSetActive(
                UUID.fromString(szRoleId),
                Boolean.parseBoolean(szActive)
            );

            return new ApiResult(
                "success", 
                "Role updated",
                null
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/roles/permissions")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult rolePermissions(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szRoleId = params.get("roleId").toString();

            List<Permission> permisssions = adminPermissionStore.getRolePermissions(
                UUID.fromString(szClientId),
                UUID.fromString(szRoleId)
            );

            return new ApiResult(
                "success",
                String.format("%d permissoins", permisssions.size()), 
                gson.toJson(permisssions)
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/roles/permissions/add")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult rolePermissionsAdd(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szRoleId = params.get("roleId").toString();
            Object permissionIds = params.get("permissionIds");

            JsonElement elem = gson.toJsonTree(permissionIds);
            if (elem instanceof JsonArray) {
                int count = 0;
                for(JsonElement e : elem.getAsJsonArray()) {
                    String permissionId = e.getAsString();
                    adminPermissionStore.assignRolePermission(
                        UUID.fromString(szClientId),
                        UUID.fromString(szRoleId),
                        Integer.parseInt(permissionId)
                    );
                    count++;
                }

                return new ApiResult(
                    "success",
                    String.format("%d permissions assigned to role", count),
                    null
                );
            } else {
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                return new ApiResult(
                    "error", 
                    "incorrect permissions", 
                    null
                );
            }
        } catch(NumberFormatException e) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return new ApiResult(
                "error", 
                "incorrect permissions id", 
                null
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/user/add")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult addUserToClient(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szEmail = params.get("email").toString();

            User user = userStore.getUserByEmail(szEmail);

            adminClientStore.addUsertoClient(
                UUID.fromString(szClientId),
                user.getId()
            );

            return new ApiResult(
                "success",
                "user added to client",
                 null
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/user/remove")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult removeUserFromClient(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szEmail = params.get("email").toString();

            User user = userStore.getUserByEmail(szEmail);

            adminClientStore.removeUserFromClient(
                UUID.fromString(szClientId),
                user.getId()
            );

            return new ApiResult(
                "success",
                "user added to client",
                 null
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/user/active")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult userSetActive(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szUserId = params.get("userId").toString();
            String szActive = params.get("active").toString();

            adminUserStore.userSetActive(
                UUID.fromString(szUserId), 
                Boolean.parseBoolean(szActive)
            );
            
            return new ApiResult(
                "success",
                "user active status updated",
                null
            );
        } catch(Exception e) {
            log.error(e);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/users/roles")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult getUserRoles(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szUserId = params.get("userId").toString();
            
            List<Role> roles = adminClientStore.getUserRoles(
                UUID.fromString(szClientId),
                UUID.fromString(szUserId)
            );

            return new ApiResult(
                "success",
                String.format("%d roles", roles.size()),
                gson.toJson(roles)
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/users/roles/add")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult assignRoleToUser(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szRoleId = params.get("roleId").toString();
            String szUserId = params.get("userId").toString();
            
            adminClientStore.assignRoleToUser(
                UUID.fromString(szClientId), 
                UUID.fromString(szRoleId),
                UUID.fromString(szUserId)
            );

            return new ApiResult(
                "success",
                "user assigned to role",
                null
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }

    @PostMapping("/users/roles/remove")
    @PreAuthorize("hasAuthority('admin.clients')")
    public ApiResult removeRoleFromUser(@RequestBody Map<String, Object> params, HttpServletResponse response) {
        try {
            String szClientId = params.get("clientId").toString();
            String szRoleId = params.get("roleId").toString();
            String szUserId = params.get("userId").toString();
            
            adminClientStore.removeRoleFromUser(
                UUID.fromString(szClientId), 
                UUID.fromString(szRoleId),
                UUID.fromString(szUserId)
            );

            return new ApiResult(
                "success",
                "user removed from role",
                null
            );
        } catch(Exception e) {
            log.error(e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ApiResult(
                "error",
                e.getMessage(),
                null
            );
        }
    }
}