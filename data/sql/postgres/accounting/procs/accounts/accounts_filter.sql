create or replace function accounts_filter (
    p_client_id clients.clients.id%type,
    p_filter_name accounting.accounts.name%type
)
returns table (
    id accounting.accounts.id%type,
    active accounting.accounts.active%type,
    type_id accounting.accounts.type_id%type,
    name accounting.accounts.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.type_id,
        a.name
    from accounting.accounts a
    where a.name like p_filter_name;
end
$$
language plpgsql;