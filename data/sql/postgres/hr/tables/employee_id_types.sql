create table if not exists employee_id_types (
    id int not null,
    client_id uuid not null,
    name varchar(100) not null,
    pattern varchar(100) not null,
    constraint pk_employee_id_types primary key (id),
    constraint u_employee_id_types_1 unique (client_id, name),
    constraint fk_employee_id_types_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);