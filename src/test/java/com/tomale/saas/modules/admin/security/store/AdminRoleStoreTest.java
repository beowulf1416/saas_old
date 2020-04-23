package com.tomale.saas.modules.admin.security.store;

import org.junit.Test;

import java.util.List;
import java.util.UUID;

import com.tomale.saas.modules.admin.security.Role;

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
public class AdminRoleStoreTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    @Value("${app.default.client}")
    private String defaultClient;

    private PGSimpleDataSource ds;
    private AdminRoleStore ars;

    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        ars = new AdminRoleStore(new JdbcTemplate(ds));
    }

    @Test
    public void testAll() {
        try {
            List<Role> roles = ars.getRoles(UUID.fromString(defaultClient));
        } catch(Exception e){
            Assert.fail(e.getMessage());
        }
    }
}