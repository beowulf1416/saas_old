/**
 * user and clients mapping
 */
create table if not exists user_clients (
    active boolean not null default false,
    user_id uuid not null,
    client_id uuid not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    constraint pk_user_clients primary key (client_id, user_id),
    constraint fk_user_clients_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_user_clients_2 foreign key (user_id)
        references iam.users (id) on delete restrict on update restrict
);