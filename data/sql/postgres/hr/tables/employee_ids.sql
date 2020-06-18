create table if not exists employee_ids (
    employee_id uuid not null,
    client_id uuid not null,
    type_id int not null,
    value varchar(100) not null,
    constraint pk_employee_ids primary key (client_id, employee_id, type_id),
    constraint fk_employee_ids_1 foreign key (employee_id)
        references hr.employees (id) on delete restrict on update restrict,
    constraint fk_employee_ids_2 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_employee_ids_3 foreign key (type_id)
        references hr.employee_id_types (id) on delete restrict on update restrict
);