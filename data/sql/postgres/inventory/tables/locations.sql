/**
 * locations table
 */
create table if not exists locations (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    warehouse_id uuid not null,
    floor_id varchar(100),
    aisle_id varchar(100),
    shelf_id varchar(100),
    rack_id varchar(100),
    level_id varchar(100),
    bin_id varchar(100),
    constraint pk_locations primary key (id),
    constraint u_locations_1 unique (client_id, warehouse_id, floor_id, aisle_id, shelf_id, rack_id, level_id, bin_id),
    constraint fk_locations_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_locations_2 foreign key (warehouse_id)
        references warehouses (id) on delete restrict on update restrict
);