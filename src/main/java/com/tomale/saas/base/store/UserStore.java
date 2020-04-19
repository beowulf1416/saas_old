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

    private static final String SQL_USER_ADD = "{? = call iam.user_add(?,?)}";
    private static final String SQL_USER_ADD_GOOGLE = "{call iam.user_add_google(?)}";

    private static final String SQL_USER_GET_BY_EMAIL = "{call iam.user_get_by_email(?)}";

    private static final String SQL_USER_EMAIL_EXISTS = "{? = call iam.user_email_exists(?)}";
    private static final String SQL_USER_SIGNIN = "{? = call iam.user_signin(?)}";

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
            stmt.registerOutParameter(1, java.sql.Types.OTHER);
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getName());
            stmt.execute();

            Object o = stmt.getObject(1);
            if (o == null) {
                throw new Exception("Unable to add user");
            } else {
                if (o instanceof UUID) {
                    UUID uuid = (UUID) o;
                    log.debug(String.format("New user created: %s", uuid.toString()));
                } else {
                    log.warn(String.format("An error occured during user registration: %s", o));
                }
            }
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }

    /**
     * 
     * @param email
     * @return null if email is not found, user object if found
     * @throws Exception
     */
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
                    // email not found
                    return null;
                }
            } else {
                throw new Exception("An error occured while retrieving user account (2)");
            }
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to retrieve user account using email address");
        }
    }

    public boolean signIn(UUID id) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_USER_SIGNIN);
            stmt.registerOutParameter(1, java.sql.Types.BOOLEAN);
            stmt.setObject(2, id);
            stmt.execute();

            return stmt.getBoolean(1);
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to sign in a user account");
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