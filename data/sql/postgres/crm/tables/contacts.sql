/**
 * table of contacts
 */
create table if not exists contacts (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    prefix varchar(100),
    suffix varchar(100),
    first_name varchar(100),
    middle_name varchar(100),
    last_name varchar(100),
    constraint pk_contacts primary key (id),
    constraint u_contacts_1 unique key (client_id, last_name, first_name, middle_name),
    constraint fk_contacts_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint chk_contacts_1 check ( len(first_name || middle_name || last_name) > 0 )
);