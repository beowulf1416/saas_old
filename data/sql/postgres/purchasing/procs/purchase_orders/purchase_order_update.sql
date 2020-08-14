create or replace function purchase_order_update (
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
    update purchasing.purchase_orders set
        description = p_description,
        facility_id = p_facility_id,
        vendor_id = p_vendor_id,
        instructions = p_instructions
    where client_id = p_client_id
        and id = p_po_id;
end
$$
language plpgsql;