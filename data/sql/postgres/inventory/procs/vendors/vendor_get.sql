create or replace function vendor_get (
    p_client_id clients.clients.id%type,
    p_vendor_id inventory.vendors.id%type
)
returns table (
    id inventory.vendors.id%type,
    name crm.organizations.name%type,
    address crm.organizations.address%type,
    country_id crm.organizations.country_id%type
)
as $$
begin
    return query
    select
        a.id,
        b.name,
        b.address,
        b.country_id
    from inventory.vendors a
        inner join crm.organizations b on a.org_id = b.id
    where a.client_id = p_client_id
        and a.id = p_vendor_id;
end
$$
language plpgsql
stable;