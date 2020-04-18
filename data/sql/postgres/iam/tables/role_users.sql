/**
 * role and user mapping
 */
create table if not exists role_users (
    role_id uuid not null,
    user_id uuid not null,
    client_id uuid not null,
    constraint pk_role_users primary key (client_id, role_id, user_id),
    constraint fk_role_users_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_role_users_2 foreign key (role_id)
        references roles (id) on delete restrict on update restrict,
    constraint fk_role_users_3 foreign key (user_id)
        references users (id) on delete restrict on update restrict
);