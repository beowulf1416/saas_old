create table if not exists contact_emails (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    updated_ts timestamp with time zone not null default(now() at time zone 'utc'),
    contact_id uuid not null,
    email public.email_address,
    constraint pk_contact_emails primary key (id)
);