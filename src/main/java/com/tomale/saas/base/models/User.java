package com.tomale.saas.base.models;

import java.util.List;
import java.util.UUID;

import lombok.Data;
import lombok.NonNull;


@Data
public class User {

    private UUID id;
    private String name;
    private String email;
    private boolean active;

    private List<String> permissions;
    private List<Client> clients;
    private Client currentClient;

    public User(@NonNull UUID id, @NonNull String name, @NonNull String email, boolean active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }

    public User(@NonNull String name, @NonNull String email) {
        this.name = name;
        this.email = email;
        this.active = true;
    }
}