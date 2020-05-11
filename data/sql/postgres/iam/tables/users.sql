/**
 * user accounts
 */
create table if not exists users (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    email public.email_address not null,
    name varchar(200) not null,
    constraint pk_users primary key (id),
    constraint u_users_1 unique (email) 
);