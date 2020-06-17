create or replace function purchase_orders_filter (
    p_client_id clients.clients.id%type,
    p_filter purchasing.purchase_orders.description%type
)
returns table (
    id purchasing.purchase_orders.id%type,
    created_ts purchasing.purchase_orders.created_ts%type,
    description purchasing.purchage_orders.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.created_ts,
        a.description
    from purchasing.purchase_orders a
    where a.description like p_filter;
end
$$
language plpgsql
stable;