create or replace function vendor_add (
    p_client_id clients.clients.id%type,
    p_vendor_id inventory.vendors.id%type,
    p_name crm.organizations.name%type,
    p_address crm.organizations.address%type,
    p_country_id crm.organizations.country_id%type
)
returns void
as $$
begin
    perform *
    from crm.organization_save(
        p_client_id,
        p_vendor_id,
        p_name,
        p_address,
        p_country_id
    );

    insert into inventory.vendors (
        id,
        client_id,
        org_id
    ) values (
        p_vendor_id,
        p_client_id,
        p_vendor_id
    );
end
$$
language plpgsql;