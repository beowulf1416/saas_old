package com.tomale.saas.modules.admin.security;

import lombok.Data;

@Data
public class Permission {
    private int id;
    private boolean active;
    private String name;

    public Permission(int id, boolean active, String name) {
        this.id = id;
        this.active = active;
        this.name = name;
    }
}