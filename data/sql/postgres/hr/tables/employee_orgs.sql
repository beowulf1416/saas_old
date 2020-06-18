create table if not exists employee_orgs (
    client_id uuid not null,
    org_id uuid not null,
    employee_id uuid not null,
    constraint pk_employee_orgs primary key (client_id, org_id, employee_id),
    constraint fk_employee_orgs_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_employee_orgs_2 foreign key (org_id)
        references clients.organizations (id) on delete restrict on update restrict,
    constraint fk_employee_orgs_3 foreign key (employee_id)
        references hr.employees (id) on delete restrict on update restrict
);