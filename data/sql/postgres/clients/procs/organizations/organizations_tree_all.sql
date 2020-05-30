/**
 * retrieves all the organizations defined for a client
 * in tree format 
 */
create or replace function organizations_tree_all (
    p_client_id clients.clients.id%type
)
returns table (
    id clients.organizations.id%type,
    name clients.organizations.name%type,
    description clients.organizations.description%type,
    level int,
    path clients.org_tree.path%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.description,
        nlevel(b.path),
        b.path
    from clients.organizations a
        inner join clients.org_tree b on a.id = b.org_id
    where a.client_id = p_client_id
        and b.client_id = p_client_id
        and b.path <@ 'root'
    order by b.path;
end
$$
language plpgsql
stable;