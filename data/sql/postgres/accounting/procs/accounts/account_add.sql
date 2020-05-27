/**
 * add account
 */
create or replace function account_add (
    p_client_id clients.clients.id%type,
    p_type_id accounting.account_types.id%type,
    p_name accounting.accounts.name%type,
    p_desc accounting.accounts.description%type
)
returns accounting.accounts.id%type
as $$
declare
    t_acct_id accounting.accounts.id%type;
    t_acct_type_name accounting.account_types.name%type;
    t_root_acct_id accounting.accounts.id%type;
    t_path text;
begin
    insert into accounting.accounts (
        client_id,
        type_id,
        name,
        description
    ) values (
        p_client_id,
        p_type_id,
        p_name,
        p_desc
    )
    returning id into t_acct_id;

    -- initial balance
    insert into accounting.account_balances (
        client_id,
        acct_id,
        value
    ) values (
        p_client_id,
        t_acct_id,
        0
    );

    -- get account type name
    select
        a.name into t_acct_type_name
    from accounting.account_types a
    where a.id = p_type_id;

    -- get root account id
    select
        a.id into t_root_acct_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.type_id = 0;

    -- account tree
    select
        'root.' || t_acct_type_name || '.' || replace(t_acct_id::text, '-', '')
        into 
        t_path;

    insert into accounting.account_tree (
        client_id,
        acct_id,
        parent_acct_id,
        path
    ) values (
        p_client_id,
        t_acct_id,
        t_root_acct_id,
        text2ltree(t_path)
    );

    return t_acct_id;
end
$$
language plpgsql;