create table if not exists purchase_order_items (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    description text not null,
    quantity decimal(12,6) not null,
    unit_id int not null,
    constraint pk_purchase_order_items primary key (id),
    constraint fk_purchase_order_items_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_purchase_order_items_2 foreign key (unit_id)
        references common.uom (id) on delete restrict on update restrict
);