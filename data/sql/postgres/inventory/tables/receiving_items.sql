create table if not exists receiving_items (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    receiving_id uuid not null,
    quantity decimal(12,6) not null,
    unit_id int not null,
    constraint pk_receiving_items primary key (id),
    constraint fk_receiving_items_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_receiving_items_2 foreign key (receiveing_id)
        references inventory.receiving (id) on delete restrict on update restrict,
    constraint fk_receiving_items_3 foreign key (unit_id)
        references common.uom (id) on delete restrict on update restrict
    constraint chk_receiving_items_1 check (quantity > 0)
);