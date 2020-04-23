package com.tomale.saas.modules.admin.security;

import java.util.UUID;

import lombok.Data;

@Data
public class Role {
    private UUID id;
    private boolean active;
    private String name;

    public Role(UUID id, boolean active, String name) {
        this.id = id;
        this.active = active;
        this.name = name;
    }
}