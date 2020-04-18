/**
 * role and client mapping
 */
create table if not exists role_clients (
    role_id uuid not null,
    client_id uuid not null,
    constraint pk_role_clients primary key (client_id, role_id),
    constraint fk_role_clients_1 foreign key (role_id) 
        references roles (id) on delete restrict on update restrict,
    constraint fk_role_clients_2 foreign key (client_id) 
        references clients.clients (id) on delete restrict on update restrict
);