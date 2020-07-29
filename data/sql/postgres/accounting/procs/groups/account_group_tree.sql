create or replace function account_group_tree (
    p_client_id clients.clients.id%type
)
returns table (
    group_id accounting.account_groups.id%type,
    name accounting.account_groups.name%type,
    type_id accounting.account_groups.type_id%type,
    level int
)
as $$
declare
    t_root_account_group_id accounting.account_groups.id%type;
begin
    select
        a.id into t_root_account_group_id
    from accounting.account_groups a
    where a.client_id = p_client_id
        and a.name = 'root';

    return query
    select
        a.group_id,
        b.name,
        b.type_id,
        nlevel(a.path)
    from accounting.account_group_tree a
        inner join accounting.account_groups b on a.group_id = b.id
    where a.client_id = p_client_id
        and a.path <@ 'root'
        and a.group_id <> t_root_account_group_id
    order by a.path;
end
$$
language plpgsql
stable;