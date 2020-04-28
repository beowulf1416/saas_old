/**
 * items and locations mapping
 */
create table if not exists item_locations (
    client_id uuid not null,
    location_id uuid not null,
    qty numeric(12, 4) not null,
    uom_id uuid not null,
    expiry date,
    batch_id varchar(100),
    lot_id varchar(100),
    constraint pk_item_locations primary key (client_id, location_id),
    constraint fk_item_locations_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_item_locations_2 foreign key (location_id)
        references locations (id) on delete restrict on update restrict,
    constraint fk_item_locations_3 foreign key (uom_id)
        references item_uom (id) on delete restrict on update restrict,
    constraint chk_item_locations_1 check(qty > 0)
);