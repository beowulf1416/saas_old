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

    private static final String SQL_USERS_SET_ACTIIVE = "{call iam.user_set_active(?,?)}";

    private JdbcTemplate jdbc;

    public AdminUsersStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void userSetActive(UUID userId, boolean active) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USERS_SET_ACTIIVE);
            stmt.setObject(1, userId);
            stmt.setBoolean(2, active);
            stmt.execute();
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to update user status");
        }
    }
}