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
    if t_acct_type_id = t_parent_acct_type_id then
        select
            a.path into t_parent_path 
        from accounting.account_tree a
        where a.client_id = p_client_id
            and a.acct_id = p_parent_acct_id;

        insert into accounting.account_tree (
            client_id,
            acct_id,
            parent_acct_id,
            path
        ) values (
            p_client_id,
            p_acct_id,
            p_parent_acct_id,
            t_parent_path || p_acct_id
        )
        on conflict do 
            update set parent_acct_id = p_parent_acct_id
            where client_id = p_client_id
                and acct_id = p_acct_id;
    else
        raise exception 'cannot assign parent account of type %s to account of type %s', parent_acct_type_id, acct_type_id;
    end if;
end
$$
language plpgsql;