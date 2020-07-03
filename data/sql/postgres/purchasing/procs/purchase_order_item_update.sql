create or replace function purchase_order_item_update (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_id purchasing.purchase_order_items.id%type,
    p_description purchasing.purchase_order_items.description%type,
    p_qty purchasing.purchase_order_items.quantity%type,
    p_unit_id purchasing.purchase_order_items.unit_id%type
)
returns void
as $$
begin
    update purchasing.purchase_order_items set
        description = p_description,
        quantity = p_qty,
        unit_id = p_unit_id
    where client_id = p_client_id
        and po_id = p_po_id
        and id = p_id;
end
$$
language plpgsql;