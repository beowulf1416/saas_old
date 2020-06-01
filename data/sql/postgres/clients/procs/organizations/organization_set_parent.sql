create or replace function organization_set_parent (
    p_client_id clients.clients.id%type,
    p_org_id clients.organizations.id%type,
    p_parent_org_id clients.organizations.id%type
)
returns void
as $$
declare
    t_parent_path clients.org_tree.path%type;
    t_old_path clients.org_tree.path%type;
    t_new_path clients.org_tree.path%type;
begin
    --get old path
    select
        a.path into t_old_path
    from clients.org_tree a
    where a.org_id = p_org_id;

    -- get parent path
    select
        a.path into t_parent_path
    from clients.org_tree a
    where a.org_id = p_parent_org_id;

    if t_parent_path is null then
        t_parent_path := 'root';
    end if;


    t_new_path := text2ltree(ltree2text(t_parent_path) || '.' || replace(p_org_id::text, '-', '_'));
    update clients.org_tree set
        parent_org_id = p_parent_org_id,
        path = t_new_path
    where client_id = p_client_id
        and org_id = p_org_id;

    -- update descendants of this org
    update clients.org_tree a set 
        path =  t_new_path || subpath(b.path, nlevel(t_old_path))
    from clients.org_tree b
    where a.client_id = p_client_id
        and b.client_id = p_client_id
        and b.path <@ t_old_path
        and nlevel(b.path) > nlevel(t_old_path)
        and a.org_id = b.org_id;
end
$$
language plpgsql;