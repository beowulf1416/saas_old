create table if not exists organizations (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(200) not null,
    address text,
    country_id int not null,
    constraint pk_organizations primary key (id),
    constraint u_organizations_1 unique (client_id, name),
    constraint fk_organizations_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);