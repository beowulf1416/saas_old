package com.tomale.saas.base.store;

import java.util.UUID;

import javax.sql.DataSource;

import com.tomale.saas.base.models.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.Assert;

import org.postgresql.ds.PGSimpleDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class UserStoreTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    @Test
    public void test() {
        PGSimpleDataSource ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        try {
            UserStore us = new UserStore(new JdbcTemplate(ds));
            us.addUser(new User(
                new UUID(1, 1),
                "test",
                "test@test.com"
            ));
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}