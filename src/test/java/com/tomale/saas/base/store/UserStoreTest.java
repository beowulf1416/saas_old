package com.tomale.saas.base.store;


import java.lang.StringBuilder;
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

        try {
            us.addUser(
                new User(
                    UUID.randomUUID(),
                    "test",
                    this.generateRandomEmail(),
                    true
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
            if (user == null) {
                Assert.fail("Email should be found");
            }
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    @Test
    public void getUserByEmailNotExists() {
        try {
            User user = us.getUserByEmail("notexists@testing.com");
            if (user != null) {
                Assert.fail("Email should not be found");
            }
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    @Test
    public void userSignin() {
        try {
            User user = us.getUserByEmail("test@test.com");
            boolean result = us.signIn(user.getId());
            if (result != user.isActive()) {
                Assert.fail("User should not be able to login");
            }
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    public String generateRandomEmail() {
        String allowed = "ABCDEFGHIJKLMNOPQRSTUVWZYZ" +
            "abcdefghijklmnopqrstuvwxyz" +
            "1234567890";

        // build username
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < 10; i++) {
            int idx = (int) Math.random() * allowed.length();
            sb.append(allowed.charAt(idx));
        }
        String username = sb.toString();

        // build domain
        sb = new StringBuilder();
        for(int i = 0; i < 10; i++) {
            int idx = (int) Math.random() * allowed.length();
            sb.append(allowed.charAt(idx));
        }
        String domain = sb.toString();

        return String.format("%s@%s.com", username, domain);
    }
}