/**
 * table of contacts
 */
create table if not exists contacts (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    prefix varchar(100),
    suffix varchar(100),
    first_name varchar(100),
    middle_name varchar(100),
    last_name varchar(100),
    constraint pk_contacts primary key (id),
    constraint chk_contacts_1 check ( length(first_name || middle_name || last_name) > 0 )
);