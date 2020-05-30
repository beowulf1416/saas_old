create table if not exists contact_emails (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    people_id uuid not null,
    email public.email_address,
    constraint pk_contact_emails primary key (id),
    constraint u_contact_emails_1 unique (client_id, people_id, email),
    constraint fk_contact_emails_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_contact_emails_2 foreign key (people_id)
        references crm.people (id) on delete restrict on update restrict
);