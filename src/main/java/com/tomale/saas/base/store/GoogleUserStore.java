package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;

import com.google.gson.JsonObject;

import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;


public class GoogleUserStore {

    private static final Logger log = LogManager.getLogger(GoogleUserStore.class);

    private final JdbcTemplate jdbc;

    public GoogleUserStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addUser(JsonObject data) {

    }
}