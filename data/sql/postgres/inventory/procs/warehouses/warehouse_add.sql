create or replace function warehouse_add (
    p_client_id clients.clients.id%type,
    p_warehouse_id inventory.warehouses.id%type,
    p_name inventory.warehouses.name%type,
    p_address inventory.warehouses.address%type
)
returns void
as $$
begin
    insert into inventory.warehouses (
        id,
        client_id,
        name,
        address
    ) values (
        p_warehouse_id,
        p_client_id,
        p_name,
        p_address
    )
    on conflict do nothing;
end
$$
language plpgsql;