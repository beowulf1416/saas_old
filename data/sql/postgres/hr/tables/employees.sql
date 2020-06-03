/**
 * employees table
 */
create table if not exists employees (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    people_id uuid not null,
    constraint pk_employees primary key (id),
    constraint u_employees_1 unique (client_id, people_id),
    constraint fk_employees_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_employees_2 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict
);