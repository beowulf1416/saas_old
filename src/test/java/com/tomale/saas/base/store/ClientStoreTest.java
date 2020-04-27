package com.tomale.saas.base.store;

import java.util.List;
import java.util.UUID;

import com.tomale.saas.base.models.Client;

import org.junit.Test;
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
public class ClientStoreTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPw;

    @Value("${app.default.client}")
    private String defaultClient;

    private PGSimpleDataSource ds;
    private ClientStore cs;

    @Before
    public void setup() {
        ds = new PGSimpleDataSource();
        ds.setUrl(dbUrl);
        ds.setUser(dbUser);
        ds.setPassword(dbPw);

        cs = new ClientStore(new JdbcTemplate(ds), defaultClient);
    }

    @Test
    public void testAll() {
        try {
            List<Client> clients = cs.getAll();
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }

    @Test
    public void testGetDefault() {
        try {
            Client client = cs.getDefault();
        } catch(Exception e) {
            Assert.fail(e.getMessage());
        }
    }
}