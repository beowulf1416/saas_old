package com.tomale.saas.modules.admin.security;

import java.util.UUID;

import lombok.Data;

@Data
public class Role {
    private UUID id;
    private boolean active;
    private UUID clientId;
    private String name;

    public Role(UUID id, boolean active, UUID clientId, String name) {
        this.id = id;
        this.active = active;
        this.clientId = clientId;
        this.name = name;
    }
}