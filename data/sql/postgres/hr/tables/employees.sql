/**
 * employees table
 */
create table if not exists employees (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    first_name varchar(100) not null,
    middle_name varchar(100) not null,
    last_name varchar(100) not null,
    prefix varchar(100),
    suffix varchar(100),
    constraint pk_employees primary key (id),
    constraint u_employees_1 unique (client_id, first_name, middle_name, last_name, prefix, suffix),
    constraint fk_employees_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);