create or replace function vendor_update (
    p_client_id clients.clients.id%type,
    p_vendor_id purchasing.vendors.id%type,
    p_name crm.organizations.name%type,
    p_address crm.organizations.address%type,
    p_country_id crm.organizations.country_id%type
)
returns void
as $$
declare
    t_organization_id purchasing.vendors.org_id%type;
begin
    select
        a.id into t_organization_id
    from purchasing.vendors a
    where a.client_id = p_client_id
        and a.id = p_vendor_id;

    update crm.organizations set 
        name = p_name,
        address = p_address,
        country_id = p_country_id
    where id = t_organization_id;
end
$$
language plpgsql;