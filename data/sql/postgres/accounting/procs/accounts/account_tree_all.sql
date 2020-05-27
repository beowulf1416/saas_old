create or replace function account_tree_all (
    p_client_id clients.clients.id%type
)
returns table (
    id accounting.accounts.id%type,
    type_id accounting.accounts.type_id%type,
    name accounting.accounts.name%type,
    description accounting.accounts.description%type,
    level int,
    path accounting.account_tree.path%type
)
as $$
begin
    return query
    select
        a.acct_id,
        b.type_id,
        b.name,
        b.description,
        nlevel(a.path),
        a.path
    from accounting.account_tree a
        inner join accounting.accounts b on a.acct_id = b.id
    where a.client_id = p_client_id
        and a.path <@ 'root'
    order by a.path;
end
$$
language plpgsql;