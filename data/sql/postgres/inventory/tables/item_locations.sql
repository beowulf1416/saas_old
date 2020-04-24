/**
 * items and locations mapping
 */
create table if not exists item_locations (
    client_id uuid not null,
    location_id uuid not null,
    qty numeric(12, 4) not null
);