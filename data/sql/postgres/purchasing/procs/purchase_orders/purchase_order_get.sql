create or replace function purchase_order_get (
    p_client_id clients.clients.id%type,
    p_order_id purchasing.purchase_orders.id%type
)
returns table (
    id purchasing.purchase_orders.id%type,
    created purchasing.purchase_orders.created_ts%type,
    description purchasing.purchase_orders.description%type,
    warehouse_id purchasing.purchase_orders.warehouse_id%type,
    vendor_id purchasing.purchase_orders.vendor_id%type,
    instructions purchasing.purchase_orders.instructions%type
)
as $$
begin
    return query
    select
        a.id,
        a.created_ts,
        a.description,
        a.warehouse_id,
        a.vendor_id,
        a.instructions
    from purchasing.purchase_orders a
    where a.client_id = p_client_id
        and a.id = p_order_id;
end
$$
language plpgsql
stable;