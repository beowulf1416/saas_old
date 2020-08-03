create or replace function facility_add (
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
    insert into inventory.facilities (
        client_id,
        id,
        name,
        description,
        address,
        country_id,
        area,
        area_uom_id
    ) values (
        p_client_id,
        p_facility_id,
        p_name,
        p_description,
        p_address,
        p_country_id,
        p_area,
        p_area_uom_id
    );
end
$$
language plpgsql;