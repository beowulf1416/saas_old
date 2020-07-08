create table if not exists projects (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(300) not null,
    description text,
    constraint pk_projects primary key (id),
    constraint fk_projects_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);