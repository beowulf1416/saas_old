create or replace function accounts_filter (
    p_client_id clients.clients.id%type,
    p_filter accounting.accounts.name%type
)
returns table (
    id accounting.accounts.id%type,
    active accounting.accounts.active%type,
    type_id accounting.accounts.type_id%type,
    name accounting.accounts.name%type,
    description accounting.accounts.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.type_id,
        a.name,
        a.description
    from accounting.accounts a
    where a.name like p_filter
        or a.description like p_filter;
end
$$
language plpgsql;