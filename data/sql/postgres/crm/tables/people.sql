create table if not exists people (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    prefix varchar(100),
    suffix varchar(100),
    first_name varchar(100),
    middle_name varchar(100),
    last_name varchar(100),
    constraint pk_people primary key (id),
    constraint u_people_1 unique (client_id, first_name, middle_name, last_name, prefix, suffix),
    constraint fk_people_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint chk_people_1 check ( length(first_name || middle_name || last_name) > 0 )
);