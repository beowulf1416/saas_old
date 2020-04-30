package com.tomale.saas.modules.admin.security.store;

import org.junit.Test;

import java.util.List;
import java.util.UUID;

import com.tomale.saas.modules.admin.security.Permission;

import org.junit.Assert;
import org.junit.Before;
import org.junit.runner.RunWith;

import org.postgresql.ds.PGSimpleDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AdminPermissionStoreTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    private PGSimpleDataSource ds;
    private AdminPermissionStore aps;

    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        aps = new AdminPermissionStore(new JdbcTemplate(ds));
    }

    @Test
    public void testAll() {
        try {
            List<Permission> permissions = aps.getPermissions();
        } catch(Exception e){
            Assert.fail(e.getMessage());
        }
    }

    @Test
    public void testRolePermissions() {
        try {
            // List<Permission> permissions = aps.getRolePermissions();
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
    
    @Test
    public void testRolePermissionAssign() {
        try {
            // aps.assignRolePermission(clientId, roleId, permissionId);
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    public void testRolePermissionRevoke() {
        try {
            // aps.revokeRolePermission(clientId, roleId, permissionId);
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}