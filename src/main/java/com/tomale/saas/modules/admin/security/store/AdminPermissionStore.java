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


public class AdminPermissionStore {

    private JdbcTemplate jdbc;

    public AdminPermissionStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
}