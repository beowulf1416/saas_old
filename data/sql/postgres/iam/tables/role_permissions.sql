/**
 * role and permission mapping
 */
create table if not exists role_permissions (
    role_id uuid not null,
    permission_id uuid not null,
    client_id uuid not null,
    constraint pk_role_permissions primary key (client_id, role_id, permission_id),
    constraint fk_role_permissions_1 foreign key (role_id)
        references roles (id) on delete restrict on update restrict,
    constraint fk_role_permission_2 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);