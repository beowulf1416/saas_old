create or replace function warehouses_get (
    p_client_id clients.clients.id%type,
    p_warehouse_id inventory.warehouses.id%type
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
        and a.id = p_warehouse_id;
end
$$
language plpgsql
stable;