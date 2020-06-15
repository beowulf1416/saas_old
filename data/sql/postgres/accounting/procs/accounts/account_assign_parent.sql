/**
 * assign parent account to account
 */
create or replace function account_assign_parent (
    p_client_id clients.clients.id%type,
    p_acct_id accounting.accounts.id%type,
    p_parent_acct_id accounting.accounts.id%type
)
returns void
as $$
declare
    t_acct_type_id accounting.accounts.type_id%type;
    t_parent_acct_type_id accounting.accounts.type_id%type;
    t_parent_path accounting.account_tree.path%type;
    t_old_path accounting.account_tree.path%type;
    t_new_path accounting.account_tree.path%type;
begin
    -- retrieve account type
    select
        a.type_id into t_acct_type_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.id = p_acct_id;

    -- retrieve parent account type
    select
        a.type_id into t_parent_acct_type_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.id = p_parent_acct_id;
    
    -- check that both accounts are the same type
    -- if not raise exception
    if t_acct_type_id = t_parent_acct_type_id then
        -- get parent path
        select
            a.path into t_parent_path 
        from accounting.account_tree a
        where a.client_id = p_client_id
            and a.acct_id = p_parent_acct_id;

        -- get old path
        select
            a.path into t_old_path
        from accounting.account_tree a
        where a.client_id = p_client_id
            and a.acct_id = p_acct_id;

        -- compute new path
        t_new_path := text2ltree(ltree2text(t_parent_path) || '.' || replace(p_acct_id::text, '-', '_'));
        update accounting.account_tree set
            parent_acct_id = p_parent_acct_id,
            path = t_new_path
        where client_id = p_client_id
            and acct_id = p_acct_id;

        -- update descendants
        update accounting.account_tree a set
            path = t_new_path || subpath(b.path, nlevel(t_old_path))
        from accounting.account_tree b
        where a.client_id = p_client_id
            and a.client_id = b.client_id
            and b.path <@ t_old_path
            and nlevel(b.path) > nlevel(t_old_path)
            and a.acct_id = b.acct_id;
    else
        raise exception 'cannot assign parent account of type %s to account of type %s', parent_acct_type_id, acct_type_id;
    end if;
end
$$
language plpgsql;