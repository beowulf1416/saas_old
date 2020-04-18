package com.tomale.saas.base.store;

import org.junit.Test;

import java.util.UUID;

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
public class PermissionStoreTest {
    
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    private PGSimpleDataSource ds;
    private PermissionStore ps;

    
    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        ps = new PermissionStore(new JdbcTemplate(ds));
    }

    @Test
    public void testUserPermissions() {
        try {
            UUID randomId = UUID.randomUUID();
            ps.userPermissions(randomId, randomId);
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}