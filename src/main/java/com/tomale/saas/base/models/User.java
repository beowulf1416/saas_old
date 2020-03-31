package com.tomale.saas.base.models;

import java.util.UUID;

import lombok.Data;

import javax.persistence.Entity;


@Data
public class User {

    private UUID id;
    private String name;
    private String email;
}