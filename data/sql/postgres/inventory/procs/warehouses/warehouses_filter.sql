create or replace function warehouses_filter (
    p_client_id clients.clients.id%type,
    p_filter inventory.warehouses.name%type
)
returns table (
    id inventory.warehouses.id%type,
    active inventory.warehouses.active%type,
    name inventory.warehouses.name%type,
    address inventory.warehouses.address%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.address
    from inventory.warehouses a
    where a.client_id = p_client_id
        and a.name like p_filter;
end
$$
language plpgsql
stable;