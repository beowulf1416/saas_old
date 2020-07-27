create or replace function account_group_get (
    p_client_id clients.clients.id%type,
    p_group_id accounting.account_groups.id%type
)
returns table (
    group_id accounting.account_groups.id%type,
    name accounting.account_groups.name%type,
    description accounting.account_groups.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.description
    from accounting.account_groups a
    where a.client_id = p_client_id
        and a.id = p_group_id;
end
$$
language plpgsql
stable;