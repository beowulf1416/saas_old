package com.tomale.saas.modules.admin.security.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.tomale.saas.base.models.User;


public class AdminUsersStore {

    private static final Logger log = LogManager.getLogger(AdminUsersStore.class);

    private JdbcTemplate jdbc;

    public AdminUsersStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // public User getUserByEmail(String email) {
    //     // TODO
    // }
}