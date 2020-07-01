create or replace function purchase_order_save (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_description purchasing.purchase_orders.description%type,
    p_warehouse_id purchasing.purchase_orders.warehouse_id%type
)
returns void
as $$
begin
    insert into purchasing.purchase_orders (
        id,
        client_id,
        description,
        warehouse_id
    ) values  (
        p_po_id,
        p_client_id,
        p_description,
        p_warehouse_id
    )
    on conflict (id) do nothing;
end
$$
language plpgsql;