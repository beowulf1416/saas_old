package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class PermissionStore {

    private static final Logger log = LogManager.getLogger(PermissionStore.class);

    private static final String SQL_PERMISSIONS_USER = "{ call iam.permissions_user_all(?,?) }";

    private final JdbcTemplate jdbc;

    public PermissionStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<String> userPermissions(UUID user_id, UUID client_id) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_PERMISSIONS_USER);
            stmt.setObject(1, user_id);
            stmt.setObject(2, client_id);
            stmt.execute();

            ResultSet rs = stmt.getResultSet();
            ArrayList<String> permissions = new ArrayList<String>();
            while(rs.next()) {
                String name = rs.getString(1);
                permissions.add(name);
            }
            return permissions;
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to retrieve user permissions");
        }
    }
}