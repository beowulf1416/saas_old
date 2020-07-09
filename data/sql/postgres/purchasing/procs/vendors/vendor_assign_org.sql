/**
 * assign crm organization as vendor
 */
create or replace function vendor_assign_org (
    p_client_id clients.clients.id%type,
    p_vendor_id purchasing.vendors.id%type,
    p_organization_id purchasing.vendors.org_id%type
)
returns void
as $$
begin
    insert into purchasing.vendors (
        id,
        client_id,
        org_id
    ) values (
        p_vendor_id,
        p_client_id,
        p_organization_id
    );
end
$$
language plpgsql;