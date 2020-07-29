create or replace function account_assign_group (
    p_client_id clients.clients.id%type,
    p_account_id accounting.accounts.id%type,
    p_group_id accounting.account_group.group_id%type
)
returns void
as $$
begin
    insert into accounting.account_group (
        client_id,
        acct_id,
        group_id
    ) values (
        p_client_id,
        p_account_id,
        p_group_id
    )
    on conflict (client_id, acct_id) do update set
        group_id = p_group_id;
end
$$
language plpgsql;