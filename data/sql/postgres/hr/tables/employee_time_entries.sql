create table if not exists employee_time_entries (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    employee_id uuid not null,
    dt_start timestamp with time zone not null,
    dt_end timestamp with time zone not null,
    computed_hours numeric(6,4) not null,
    constraint pk_employee_time_entries primary key (id),
    constraint u_employee_time_entries_1 unique (client_id, employee_id, dt_start, dt_end),
    constraint fk_employee_time_entries_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_employee_time_entries_2 foreign key (employee_id)
        references hr.employees (id) on delete restrict on update restrict,
    constraint chk_employee_time_entries_1 check (dt_start = dt_end)
);