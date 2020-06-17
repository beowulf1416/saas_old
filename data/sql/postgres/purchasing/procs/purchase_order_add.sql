create or replace function purchase_order_add (
    p_client_id clients.clients.id%type,
    p_description purchasing.purchase_orders.description%type,
    p_warehouse_id purchasing.purchase_orders.warehouse_id%type
)
returns purchasing.purchase_orders.id%type
as $$
declare
    t_po_id purchasing.purchase_orders.id%type;
begin
    insert into purchasing.purchase_orders (
        client_id,
        description,
        warehouse_id
    ) values  (
        p_client_id,
        p_description,
        p_warehouse_id
    );
end
$$
language plpgsql;