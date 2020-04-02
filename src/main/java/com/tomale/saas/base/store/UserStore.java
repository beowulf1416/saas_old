package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import java.sql.CallableStatement;
import java.sql.SQLException;
import java.util.UUID;

import com.google.gson.JsonObject;
import com.tomale.saas.base.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;


public class UserStore {

    private static final Logger log = LogManager.getLogger(UserStore.class);

    private static final String SQL_USER_ADD = "{call iam.user_add(?)}";
    private static final String SQL_USER_EMAIL_EXISTS = "{? = call iam.user_email_exists(?)}";
    private static final String SQL_USER_SIGNIN = "{ call iam.user_signin(?)}";

    private final JdbcTemplate jdbc;

    @Autowired
    public UserStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addUser(User user, JsonObject data) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_ADD);
            stmt.setString(1, user.getEmail());
            stmt.execute();
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }

    public void userSignIn(UUID id) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_SIGNIN);
            stmt.setString(1, id.toString());
            stmt.execute();
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to update user last signed in timestamp");
        }
    }

    public boolean userEmailExists(String email) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_EMAIL_EXISTS);
            stmt.registerOutParameter(1, java.sql.Types.BOOLEAN);
            stmt.setString(2, email);
            stmt.execute();

            return stmt.getBoolean(1);
        } catch(SQLException e){
            log.error(e);
            throw new Exception("An error occured while trying to check if email exists");
        }
    }
}