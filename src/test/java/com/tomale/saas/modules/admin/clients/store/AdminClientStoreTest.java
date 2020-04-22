package com.tomale.saas.modules.admin.clients.store;

import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.List;
import java.util.UUID;

import org.junit.Assert;
import org.junit.Before;

import org.postgresql.ds.PGSimpleDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tomale.saas.base.models.Client;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AdminClientStoreTest {
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    private PGSimpleDataSource ds;
    private AdminClientStore adminClientStore;

    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        adminClientStore = new AdminClientStore(new JdbcTemplate(ds));
    }

    @Test
    public void testGetAll() {
        try {
            List<Client> clients = adminClientStore.getAll();
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    public String generateRandomString(int length) {
        String allowed = "ABCDEFGHIJKLMNOPQRSTUVWZYZ" +
            "abcdefghijklmnopqrstuvwxyz" +
            "1234567890";

        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < length; i++) {
            int idx = (int) (Math.random() * allowed.length());
            sb.append(allowed.charAt(idx));
        }
        String tmp = sb.toString();
        return tmp;
    }

    @Test
    public void testAdd() {
        try {
            String tmp = generateRandomString(10);
            UUID id = adminClientStore.add(tmp, tmp);
            if (id == null) {
                Assert.fail("Id should not be null");
            }
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}