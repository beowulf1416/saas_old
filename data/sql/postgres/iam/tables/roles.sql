/**
 * role management
 */
create table if not exists roles (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'UTC'),
    name varchar(200) not null,
    constraint pk_roles primary key (id),
    constraint u_roles_1 unique (name)
);