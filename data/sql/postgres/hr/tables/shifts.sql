create table if not exists shifts (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(50) not null,
    start_time time without time zone not null,
    end_time time without time zone not null,
    constraint pk_shifts primary key (id),
    constraint u_shifts_1 unique (client_id, name),
    constraint fk_shifts_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);