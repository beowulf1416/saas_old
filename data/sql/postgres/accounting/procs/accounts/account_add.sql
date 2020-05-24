/**
 * add account
 */
create or replace function account_add (
    p_client_id clients.clients.id%type,
    p_type_id accounting.account_types.id%type,
    p_name accounting.accounts.name%type
)
returns accounting.accounts.id%type
as $$
declare
    t_acct_id accounting.accounts.id%type;
begin
    insert into accounting.accounts (
        client_id,
        type_id,
        name
    ) values (
        p_client_id,
        p_type_id,
        p_name
    )
    returning id into t_acct_id;

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