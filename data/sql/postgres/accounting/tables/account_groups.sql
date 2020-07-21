create table if not exists account_groups (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(100) not null,
    description text,
    constraint pk_account_groups primary key (id),
    constraint fk_account_groups_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);