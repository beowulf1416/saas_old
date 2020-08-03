create or replace function facility_filter (
    p_client_id clients.clients.id%type,
    p_filter inventory.facilities.name%type
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
        and (
            a.name ilike p_filter
            or a.description ilike p_filter
            or a.address ilike p_filter
        );
end
$$
language plpgsql
stable;