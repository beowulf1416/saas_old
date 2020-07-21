create or replace function account_group_tree (
    p_client_id clients.clients.id%type
)
returns table (
    group_id accounting.account_groups.id%type,
    name accounting.account_groups.name%type,
    level int
)
as $$
begin
    return query
    select
        a.group_id,
        b.name,
        nlevel(a.path)
    from accounting.account_group_tree a
        inner join accounting.account_groups b on a.group_id = b.id
    where a.client_id = p_client_id
        and a.path <@ 'root'
    order by a.path;
end
$$
language plpgsql
stable;