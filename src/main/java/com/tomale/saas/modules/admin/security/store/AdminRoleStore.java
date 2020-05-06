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

import com.tomale.saas.modules.admin.security.Role;

public class AdminRoleStore {

    private static final Logger log = LogManager.getLogger(AdminRoleStore.class);

    private static final String SQL_ROLES_ALL = "{call iam.roles_all(?)}";
    private static final String SQL_ROLE_ADD = "{? = call iam.role_add(?,?)}";
    private static final String SQL_ROLE_ACTIVE = "{call iam.role_set_active(?,?)}";

    private JdbcTemplate jdbc;

    public AdminRoleStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Role> getRoles(UUID clientId) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_ROLES_ALL);
            stmt.setObject(1, clientId);
            stmt.execute();

            ResultSet rs = stmt.getResultSet();
            ArrayList<Role> roles = new ArrayList<Role>();
            while(rs.next()) {
                UUID id = UUID.fromString(rs.getString(1));
                boolean active = rs.getBoolean(2);
                String name = rs.getString(4);

                roles.add(new Role(id, active, clientId, name));
            }
            return roles;
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to retrieve roles");
        }
    }

    public UUID addRole(UUID clientId, String name) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_ROLE_ADD);
            stmt.registerOutParameter(1, java.sql.Types.OTHER);
            stmt.setObject(2, clientId);
            stmt.setString(3, name);
            stmt.execute();

            UUID roleId = (UUID) stmt.getObject(1);
            return roleId;
        } catch(Exception e) {
            log.error(e);
            throw new Exception("An error occured while trying to add a role");
        }
    }

    public void roleSetActive(UUID roleId, boolean active) throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_ROLE_ACTIVE);
            stmt.setObject(1, roleId);
            stmt.setBoolean(2, active);
            stmt.execute();
        } catch(Exception e) {
            log.error(e);
            throw new Exception("An error occured while trying to update role status");
        }
    }
}