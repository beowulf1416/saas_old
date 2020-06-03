create or replace function location_add (
    p_client_id clients.clients.id%type,
    p_warehouse_id inventory.warehouses.id%type,
    p_floor_id inventory.locations.floor_id%type,
    p_shelf_id inventory.locations.shelf_id%type,
    p_rack_id inventory.locations.rack_id%type,
    p_level_id inventory.locations.level_id%type,
    p_bin_id inventory.locations.bin_id%type
)
returns inventory.locations.id%type
as $$
declare
    t_location_id inventory.locations.id%type;
begin
    insert into inventory.locations (
        client_id,
        warehouse_id,
        floor_id,
        shelf_id,
        rack_id,
        level_id,
        bin_id
    ) values (
        p_client_id,
        p_warehouse_id,
        p_floor_id,
        p_shelf_id,
        p_rack_id,
        p_level_id,
        p_bin_id
    )
    returning id into t_location_id;

    returns t_location_id;
end
$$
language plpgsql;
