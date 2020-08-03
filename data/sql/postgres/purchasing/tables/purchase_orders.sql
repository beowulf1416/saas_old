create table if not exists purchase_orders (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    description text not null,
    facility_id uuid not null,
    vendor_id uuid not null,
    instructions text,
    constraint pk_purchase_orders primary key (id),
    constraint fk_purchase_orders_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_purchase_orders_2 foreign key (vendor_id)
        references purchasing.vendors (id) on delete restrict on update restrict,
    constraint fk_purchase_orders_3 foreign key (client_id, facility_id)
        references inventory.facilities (client_id, id) on delete restrict on update restrict
);