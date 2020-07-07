create or replace function vendors_filter (
    p_client_id clients.clients.id%type,
    p_filter text
)
returns table (
    id purchasing.vendors.id%type,
    name crm.organizations.name%type
)
as $$
begin
    return query
    select
        a.id,
        b.name
    from purchasing.vendors a
        inner join crm.organizations b on a.org_id = b.id
    where b.name like p_filter;
end
$$
language plpgsql
stable;