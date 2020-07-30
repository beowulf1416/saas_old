create or replace function location_filter (
    p_client_id clients.clients.id%type,
    p_filter varchar(100)
)
returns table (
    location_id inventory.locations.id%type,
    warehouse_id inventory.locations.warehouse_id%type,
    name inventory.locations.name%type,
    floor_id inventory.locations.floor_id%type,
    aisle_id inventory.locations.aisle_id%type,
    shelf_id inventory.locations.shelf_id%type,
    rack_id inventory.locations.rack_id%type,
    level_id inventory.locations.level_id%type,
    bin_id inventory.locations.bin_id%type
)
as $$
begin
    return query
    select
        a.id,
        a.warehouse_id,
        a.name,
        a.floor_id,
        a.aisle_id,
        a.shelf_id,
        a.rack_id,
        a.level_id,
        a.bin_id
    from inventory.locations a
    where a.client_id = p_client_id
        and a.name ilike p_filter;
end
$$
language plpgsql
stable;