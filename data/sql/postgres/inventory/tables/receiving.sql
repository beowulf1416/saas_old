create table if not exists receiving (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    constraint pk_receiving primary key (id),
    constraint fk_receiving_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);