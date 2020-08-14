create or replace function purchase_order_update_status (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_status purchasing.purchase_orders.status_id%type
)
returns void
as $$
begin
    update purchasing.purchase_orders set
        status_id = p_status
    where client_id = p_client_id
        and id = p_po_id;
end
$$
language plpgsql;