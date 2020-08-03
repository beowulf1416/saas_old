create or replace function facility_update (
    p_client_id clients.clients.id%type,
    p_facility_id inventory.facilities.id%type,
    p_name inventory.facilities.name%type,
    p_description inventory.facilities.description%type,
    p_address inventory.facilities.address%type,
    p_country_id inventory.facilities.country_id%type,
    p_area inventory.facilities.area%type,
    p_area_uom_id inventory.facilities.area_uom_id%type
)
returns void
as $$
begin
    update inventory.facilities set
        name = p_name,
        description = p_description,
        address = p_address,
        country_id = p_country_id,
        area = p_area,
        area_uom_id = p_area_uom_id
    where client_id = p_client_id
        and id = p_facility_id;
end
$$
language plpgsql;