create or replace function organization_get(
    p_org_id clients.organizations.id%type
)
returns table (
    id clients.organizations.id%type,
    active clients.organizations.active%type,
    name clients.organizations.name%type,
    description clients.organizations.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.description
    from clients.organizations a
    where a.id = p_org_id;
end
$$
language plpgsql
stable;