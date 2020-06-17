create or replace function purchase_order_item_add (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_description purchasing.purchase_order_items.description%type,
    p_qty purchasing.purchase_order_items.quantity%type,
    p_unit_id purchasing.purchase_order_items.unit_id%type
)
returns void
as $$
begin
    insert into purchasing.purchase_order_items (
        client_id,
        po_id,
        description,
        quantity,
        unit_id
    ) values (
        p_client_id,
        p_po_id,
        p_description,
        p_qty,
        p_unit_id
    );
end
$$
language plpgsql;