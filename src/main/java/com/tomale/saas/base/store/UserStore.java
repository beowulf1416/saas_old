package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import java.util.UUID;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.UUID;

import com.google.gson.JsonObject;
import com.tomale.saas.base.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;


public class UserStore {

    private static final Logger log = LogManager.getLogger(UserStore.class);

    private static final String SQL_USER_ADD = "{call iam.user_add(?)}";
    private static final String SQL_USER_ADD_GOOGLE = "{call iam.user_add_google(?)}";

    private static final String SQL_USER_GET_BY_EMAIL = "{call iam.user_get_by_email(?)}";

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
            stmt.setString(2, user.getName());
            stmt.execute();
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }

    public User getUserByEmail(String email) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_GET_BY_EMAIL);
            stmt.setString(1, email);
            if (stmt.execute()) {
                ResultSet rs = stmt.getResultSet();
                if (rs.next()) {
                    String id = rs.getString("id");
                    Boolean active = rs.getBoolean("active");
                    Timestamp created_ts = rs.getTimestamp("created_ts");
                    String addr = rs.getString("email");
                    return new User(
                        UUID.fromString(id),
                        "test",
                        addr,
                        active
                    );
                } else {
                    throw new Exception("An error occured while retrieving user account (1)");
                }
            } else {
                throw new Exception("An error occured while retrieving user account (2)");
            }
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to retrieve user account using email address");
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

    public void updateUserLastSignedIn(String email) throws Exception {

    }
}