create table if not exists purchase_orders (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    description text not null,
    constraint pk_purchase_orders primary key (id),
    constraint fk_purchase_orders_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict 
);