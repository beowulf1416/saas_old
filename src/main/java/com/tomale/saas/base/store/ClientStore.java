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
import java.util.UUID;

import com.tomale.saas.base.models.Client;


public class ClientStore {

    private static final Logger log = LogManager.getLogger(ClientStore.class);

    private static final String SQL_CLIENTS_ALL = "{call clients.clients_all()}";
    private static final String SQL_CLIENTS_GET = "{call clients.clients_get(?)}";

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
            ArrayList<Client> clients = new ArrayList<Client>();
            while(rs.next()) {
                UUID id = UUID.fromString(rs.getString(1));
                boolean active = rs.getBoolean(2);
                String name = rs.getString(3);
                String address = rs.getString(4);

                clients.add(new Client(id, name, address));
            }
            return clients;
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }

    public List<Client> get() throws Exception {
        try {
            CallableStatement stmt = jdbc.getDataSource()
                .getConnection()
                .prepareCall(SQL_CLIENTS_GET);
            stmt.execute();

            ResultSet rs = stmt.getResultSet();
            ArrayList<Client> results = new ArrayList<Client>();
            while(rs.next()) {
                UUID id = UUID.fromString(rs.getString(0));
                boolean active = rs.getBoolean(1);
                String name = rs.getString(2);
                String address = rs.getString(3);
            }
            return results;
        } catch(SQLException e) {
            log.error(e);
            throw new Exception("An error occured while trying to add user");
        }
    }
}