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
    t_root_acct_id accounting.accounts.id%type;
begin
    if p_type_id == 0 then
        raise 'cannot add a root account';
    end if;

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

    -- retrieve root account
    select
        a.id into t_root_acct_id
    from accounting.accounts a
    where a.client_id = p_client_id
        and a.type_id = 0;

    -- account tree
    insert into accounting.account_tree (
        client_id,
        acct_id,
        parent_acct_id
    ) values (
        p_client_id,
        t_acct_id,
        t_root_acct_id
    );

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

    return t_acct_id;
end
$$
language plpgsql;