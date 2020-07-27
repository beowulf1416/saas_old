/**
 * retrieve accounts under this group
 */
create or replace function account_group_accounts (
    p_client_id clients.clients.id%type,
    p_group_id accounting.account_groups.id%type
)
returns table (
    account_id accounting.accounts.id%type,
    active accounting.accounts.active%type,
    created_ts accounting.accounts.created_ts%type,
    type_id accounting.accounts.type_id%type,
    name accounting.accounts.name%type,
    description accounting.accounts.description%type,
    value accounting.account_balances.value%type
)
as $$
begin
    return query
    select
        a.id account_id,
        a.active,
        a.created_ts,
        a.type_id,
        a.name,
        a.description,
        ab.value
    from accounting.accounts a
        inner join accounting.account_group ag on a.id = ag.acct_id 
            and a.client_id = ag.client_id
        inner join accounting.account_balances ab on a.id = ab.acct_id 
            and a.client_id = ab.client_id
    where a.client_id = p_client_id
        and ag.client_id = p_client_id
        and ag.group_id = p_group_id;
end
$$
language plpgsql
stable;