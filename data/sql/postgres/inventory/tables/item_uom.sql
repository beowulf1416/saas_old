/**
 * items and units of measure mapping
 */
create table if not exists item_uom (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    item_id uuid not null,
    name varchar(30) not null,
    symbol varchar(5),
    constraint pk_item_uom primary key (id),
    constraint u_item_uom_1 unique (client_id, name),
    constraint fk_item_uom_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_uom_2 foreign key (item_id)
        references items (id) on delete restrict on update restrict
);