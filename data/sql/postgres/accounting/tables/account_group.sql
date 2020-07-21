create table if not exists account_group (
    client_id uuid not null,
    acct_id uuid not null,
    group_id uuid not null,
    constraint pk_account_group primary key (client_id, acct_id),
    constraint fk_account_group_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_account_group_2 foreign key (acct_id)
        references accounting.accounts (id) on delete restrict on update restrict,
    constraint fk_account_group_3 foreign key (group_id)
        references accounting.account_groups (id) on delete restrict on update restrict
);