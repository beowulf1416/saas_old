package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import java.sql.CallableStatement;
import java.sql.SQLException;

import com.tomale.saas.base.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserStore {

    private static final Logger log = LogManager.getLogger(UserStore.class);

    private static final String SQL_USER_ADD = "{call iam.user_add(?)}";

    private final JdbcTemplate jdbc;

    @Autowired
    public UserStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addUser(User user) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_ADD);
            stmt.setString(1, "test@test.com");

            if (!stmt.execute()) {
                throw new Exception("An error occured while trying to add user (2)");
            }
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user (1)");
        }
    }
}