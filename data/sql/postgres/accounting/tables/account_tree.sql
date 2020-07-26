/**
 * account hierarchy table
 */
create table if not exists account_tree (
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    group_id uuid not null,
    parent_group_id uuid not null,
    account_id uuid,
    path public.ltree not null,
    constraint pk_account_tree primary key (client_id, group_id, account_id),
    -- account can only have 1 parent account
    constraint u_account_tree_1 unique (client_id, account_id),
    constraint fk_account_tree_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_account_tree_2 foreign key (account_id)
        references accounting.accounts (id) on delete restrict on update restrict,
    constraint fk_account_tree_3 foreign key (parent_group_id)
        references accounts (id) on delete restrict on update restrict
);
create index idx_account_tree_1 on account_tree using gist (path);