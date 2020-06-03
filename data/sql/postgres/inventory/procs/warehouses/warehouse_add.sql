create or replace function warehouse_add (
    p_client_id clients.clients.id%type,
    p_name inventory.warehouses.name%type,
    p_address inventory.warehouses.address%type
)
returns inventory.warehouses.id%type
as $$
declare
    t_warehouse_id inventory.warehouses.id%type;
begin
    insert into inventory.warehouses (
        client_id,
        name,
        address
    ) values (
        p_client_id,
        p_name,
        p_address
    )
    returning id into t_warehouse_id;

    return t_warehouse_id;
end
$$
language plpgsql;