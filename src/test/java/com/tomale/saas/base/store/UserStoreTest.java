package com.tomale.saas.base.store;

import java.util.UUID;

import javax.sql.DataSource;

import com.tomale.saas.base.models.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;
import org.junit.Before;
import org.postgresql.ds.PGSimpleDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.gson.JsonObject;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class UserStoreTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    private PGSimpleDataSource ds;
    private UserStore us;

    
    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        us = new UserStore(new JdbcTemplate(ds));
    }

    @Test
    public void addUser() {
        // PGSimpleDataSource ds = new PGSimpleDataSource();
        // ds.setUrl(dbUrl);
        // ds.setUser(dbUser);
        // ds.setPassword(dbPw);

        try {
            // UserStore us = new UserStore(new JdbcTemplate(ds));
            us.addUser(
                new User(
                    new UUID(1, 1),
                    "test",
                    "test@test.com"
                ),
                new JsonObject()
            );
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    @Test
    public void getUserByEmail() {
        try {
            User user = us.getUserByEmail("test@test.com");
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}