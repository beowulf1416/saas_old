create or replace function location_add (
    p_client_id clients.clients.id%type,
    p_location_id inventory.locations.id%type,
    p_facility_id inventory.facilities.id%type,
    p_name inventory.locations.name%type,
    p_floor_id inventory.locations.floor_id%type,
    p_aisle_id inventory.locations.aisle_id%type,
    p_area_id inventory.locations.area_id%type,
    p_section_id inventory.locations.section_id%type,
    p_shelf_id inventory.locations.shelf_id%type,
    p_rack_id inventory.locations.rack_id%type,
    p_level_id inventory.locations.level_id%type,
    p_bin_id inventory.locations.bin_id%type
)
returns void
as $$
begin
    insert into inventory.locations (
        client_id,
        id,
        facility_id,
        name,
        floor_id,
        aisle_id,
        area_id,
        section_id,
        shelf_id,
        rack_id,
        level_id,
        bin_id
    ) values (
        p_client_id,
        p_location_id,
        p_facility_id,
        p_name,
        p_floor_id,
        p_aisle_id,
        p_area_id,
        p_section_id,
        p_shelf_id,
        p_rack_id,
        p_level_id,
        p_bin_id
    );
end
$$
language plpgsql;
