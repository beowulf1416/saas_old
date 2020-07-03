create or replace function purchase_order_items_get (
    p_client_id clients.clients.id%type,
    p_order_id purchasing.purchase_orders.id%type
)
returns table (
    description purchasing.purchase_order_items.description%type,
    quantity purchasing.purchase_order_items.quantity%type,
    unit_id purchasing.purchase_order_items.unit_id%type,
    unit text
)
as $$
begin
    return query
    select
        a.description,
        a.quantity,
        a.unit_id,
        case when b.symbol is null then b.name else b.name || ' (' || b.symbol || ') ' end unit
    from purchasing.purchase_order_items a
        inner join common.uom b on a.unit_id = b.id
    where a.client_id = p_client_id
        and a.po_id = p_order_id;
end
$$
language plpgsql
stable;