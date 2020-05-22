create table if not exists contact_numbers (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    contact_id uuid not null,
    number varchar(20) not null,
    constraint pk_contact_numbers primary key (id),
    constraint u_contact_numbers_1 unique (contact_id, number),
    constraint fk_contact_numbers_1 foreign key (contact_id)
        references crm.contacts (id) on delete restrict on update restrict
);