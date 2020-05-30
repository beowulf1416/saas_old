create table if not exists contact_numbers (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    people_id uuid not null,
    number varchar(20) not null,
    constraint pk_contact_numbers primary key (id),
    constraint u_contact_numbers_1 unique (client_id, people_id, number),
    constraint fk_contact_numbers foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_contact_numbers_2 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict
);