create or replace function purchase_order_item_remove (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_id purchasing.purchase_order_items.id%type
)
returns void
as $$
begin
    delete from purchasing.purchase_order_items
    where client_id = p_client_id
        and po_id = p_po_id
        and id = p_id;
end
$$
language plpgsql;