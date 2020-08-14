create or replace function purchase_order_add (
    p_client_id clients.clients.id%type,
    p_po_id purchasing.purchase_orders.id%type,
    p_description purchasing.purchase_orders.description%type,
    p_facility_id purchasing.purchase_orders.facility_id%type,
    p_vendor_id purchasing.purchase_orders.vendor_id%type,
    p_instructions purchasing.purchase_orders.instructions%type
)
returns void
as $$
begin
    insert into purchasing.purchase_orders (
        id,
        client_id,
        description,
        facility_id,
        vendor_id,
        instructions,
        status
    ) values  (
        p_po_id,
        p_client_id,
        p_description,
        p_facility_id,
        p_vendor_id,
        p_instructions,
        1 -- purchasing.purchase_order_states.new
    );
end
$$
language plpgsql;