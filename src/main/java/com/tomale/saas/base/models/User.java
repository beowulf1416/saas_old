package com.tomale.saas.base.models;

import java.util.UUID;

import lombok.Data;


@Data
public class User {

    private UUID id;
    private String name;
    private String email;

    public User(UUID id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}