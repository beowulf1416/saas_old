create or replace function purchase_order_update (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_description purchasing.purchase_orders.description%type,
    p_warehouse_id purchasing.purchase_orders.warehouse_id%type
)
returns void
as $$
begin
    update purchasing.purchase_orders set
        description = p_description,
        warehouse_id = p_warehouse_id
    where client_id = p_client_id
        and po_id = p_po_id;
end
$$
language plpgsql;