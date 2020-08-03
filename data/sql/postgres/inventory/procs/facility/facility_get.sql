create or replace function facility_get (
    p_client_id clients.clients.id%type,
    p_facility_id inventory.facilities.id%type
)
returns table (
    facility_id inventory.facilities.id%type,
    active inventory.facilities.active%type,
    created inventory.facilities.created_ts%type,
    name inventory.facilities.name%type,
    description inventory.facilities.description%type,
    address inventory.facilities.address%type,
    country_id inventory.facilities.country_id%type,
    area inventory.facilities.area%type,
    area_uom_id inventory.facilities.area_uom_id%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.created_ts,
        a.name,
        a.description,
        a.address,
        a.country_id,
        a.area,
        a.area_uom_id
    from inventory.facilities a
    where a.client_id = p_client_id
        and a.id = p_facility_id;
end
$$
language plpgsql
stable;