package com.tomale.saas.base.models;

import java.util.UUID;

import lombok.Data;

@Data
public class Client {

    private UUID id;
    private boolean active;
    private String name;
    private String address;

    public Client(UUID id, boolean active, String name, String address) {
        this.id = id;
        this.active = active;
        this.name = name;
        this.address = address;
    }
}