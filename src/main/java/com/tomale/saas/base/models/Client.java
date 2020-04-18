package com.tomale.saas.base.models;

import java.util.UUID;

import lombok.Data;

@Data
public class Client {

    private UUID id;
    private String name;
    private String address;

    public Client(UUID id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}