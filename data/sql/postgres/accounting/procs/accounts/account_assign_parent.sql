create or replace function account_assign_parent (
    p_client_id clients.clients.id%type,
    p_acct_id accounting.accounts.id%type,
    p_parent_acct_id accounting.accounts.id%type
)
returns void
as $$
declare
    acct_type_id accounting.accounts.type_id%type;
    parent_acct_type_id accounting.accounts.type_id%type;
begin
    select
        a.type_id into acct_type_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.id = p_acct_id;

    select
        a.type_id into parent_acct_type_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.id = p_parent_acct_id;
    
    if acct_type_id == parent_acct_type_id then
        insert into accounting.account_tree (
            client_id,
            acct_id,
            parent_acct_id
        ) values (
            p_client_id,
            p_acct_id,
            p_parent_acct_id
        );
    else
        raise exception 'cannot assign parent account of type %s to account of type %s', parent_acct_type_id, acct_type_id;
    endif;
end
$$
language plpgsql;