package com.tomale.saas.base.models;

import java.util.UUID;

import lombok.Data;
import lombok.NonNull;


@Data
public class User {

    private UUID id;
    private String name;
    private String email;

    public User(@NonNull UUID id, @NonNull String name, @NonNull String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public User(@NonNull String name, @NonNull String email) {
        this.name = name;
        this.email = email;
    }
}