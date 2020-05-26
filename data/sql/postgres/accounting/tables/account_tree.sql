create table if not exists account_tree (
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    acct_id uuid not null,
    parent_acct_id uuid not null,
    path ltree,
    constraint pk_account_tree primary key (client_id, acct_id, parent_acct_id),
    constraint fk_account_tree_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_account_tree_2 foreign key (acct_id)
        references accounts (id) on delete restrict on update restrict,
    constraint fk_account_tree_3 foreign key (parent_acct_id)
        references accounts (id) on delete restrict on update restrict,
    constraint chk_account_tree_1 check (acct_id != parent_acct_id)
);
create index idx_account_tree_1 on account_tree using gist (path);