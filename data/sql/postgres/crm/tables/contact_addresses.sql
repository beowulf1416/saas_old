create table if not exists contact_addresses (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    contact_id uuid not null,
    country_id int not null,
    address varchar(200),
    constraint pk_contact_addresses primary key (id),
    constraint u_contact_addresses_1 unique (contact_id, country_id, address),
    constraint fk_contact_addresses_1 foreign key (contact_id)
        references crm.contacts (id) on delete restrict on update restrict
);