create table if not exists project_tasks (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    project_id uuid not null,
    name varchar(300) not null,
    description text,
    planned_start_ts timestamp without time zone,
    planned_end_ts timestamp without time zone,
    actual_start_ts timestamp without time zone,
    actual_end_ts timestamp without time zone,
    constraint pk_project_tasks primary key (client_id, id),
    constraint fk_project_tasks_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_project_tasks_2 foreign key (client_id, project_id)
        references work.projects (client_id, id) on delete restrict on update restrict,
    constraint u_project_tasks_1 check (planned_end_ts > planned_start_ts),
    constraint u_project_tasks_2 check (actual_end_ts > actual_start_ts)
);