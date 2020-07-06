create or replace function organization_get(
    p_client_id clients.clients.id%type,
    p_org_id crm.organizations.id%type
)
returns table (
    id crm.organizations.id%type,
    name crm.organizations.name%type,
    address crm.organizations.address%type,
    country_id crm.organizations.country_id%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.address,
        a.country_id
    from crm.organizations a
    where a.client_id = p_client_id
        and a.id = p_org_id;
end
$$
language plpgsql
stable;