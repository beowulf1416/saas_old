package com.tomale.saas.base.store;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.tomale.saas.base.models.Client;


public class ClientStore {

    private static final Logger log = LogManager.getLogger(ClientStore.class);

    private static final String SQL_CLIENTS_ALL = "{? = call clients.clients_all()}";

    private final JdbcTemplate jdbc;

    @Autowired
    public ClientStore(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Client> getAll() throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_CLIENTS_ALL);
            stmt.execute();

            ResultSet rs = stmt.getResultSet();
            ArrayList<Client> results = new ArrayList<Client>();
            return results;
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }
}