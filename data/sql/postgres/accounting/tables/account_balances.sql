create table if not exists account_balances (
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    acct_id uuid not null,
    value numeric(12,6) not null,
    constraint pk_account_balances primary key (client_id, acct_id),
    constraint fk_account_balances_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_account_balances_2 foreign key (acct_id)
        references accounts (id) on delete restrict on update restrict
);