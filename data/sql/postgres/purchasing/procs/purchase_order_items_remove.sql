create or replace function purchase_order_items_remove (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.po_id%type
)
returns void
as $$
begin
    delete from purchasing.purchase_orders
    where client_id = p_client_id
        and po_id = p_po_id;
end
$$
language plpgsql;