create or replace function clients_roles_filter (
    p_client_id clients.clients.id%type,
    p_filter iam.roles.name%type
)
returns table (
    id iam.roles.id%type,
    active iam.roles.active%type,
    name iam.roles.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name
    from iam.roles a
    where a.name like p_filter;
end
$$
language plpgsql
stable;