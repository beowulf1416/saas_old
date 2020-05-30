create table if not exists contact_addresses (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    people_id uuid not null,
    country_id int not null,
    address varchar(200),
    constraint pk_contact_addresses primary key (id),
    constraint u_contact_addresses_1 unique (client_id, people_id, country_id, address),
    constraint fk_contact_address_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_contact_addresses_2 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict,
    constraint fk_contact_addresses_3 foreign key (country_id)
        references common.countries (iso_3166_1_numeric) on delete restrict on update restrict
);