create or replace function organization_filter (
    p_client_id clients.clients.id%type,
    p_filter crm.organizations.name%type
)
returns table (
    id crm.organizations.id%type,
    name crm.organizations.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.name
    from crm.organizations a
    where a.client_id = p_client_id
        and a.name like p_filter;
end
$$
language plpgsql
stable;