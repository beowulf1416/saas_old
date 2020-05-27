create or replace function account_get_children (
    p_client_id clients.clients.id%type,
    p_account_id accounting.accounts.id%type
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
        inner join accounting.account_tree t on a.id = t.parent_acct_id
    where a.client_id = p_client_id
        and t.client_id = p_client_id
        and t.parent_acct_id = p_account_id;
end
$$
language plpgsql;