create table if not exists item_vendors (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    item_id uuid not null,
    vendor_id uuid not null,
    lead_time int not null,
    constraint pk_item_vendors primary key (id),
    constraint u_item_vendors_1 unique (client_id, item_id, vendor_id),
    constraint fk_item_vendors_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_vendors_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict,
    constraint fk_item_vendors_3 foreign key (vendor_id)
        references vendors on delete restrict on update restrict
);