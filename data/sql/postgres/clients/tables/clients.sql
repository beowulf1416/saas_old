/**
 * client management
 */
create table if not exists clients (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    name varchar(200) not null,
    address text,
    constraint pk_clients primary key (id),
    constraint u_clients_1 unique (name),
    constraint chk_clients_1 check (name <> '')
);