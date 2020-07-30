create or replace function warehouse_update (
    p_client_id clients.clients.id%type,
    p_warehouse_id inventory.warehouses.id%type,
    p_name inventory.warehouses.name%type,
    p_address inventory.warehouses.address%type
)
returns void
as $$
begin
    update inventory.warehouses set
        name = p_name,
        address = p_address
    where client_id = p_client_id
        and id = p_warehouse_id;
end
$$
language plpgsql;