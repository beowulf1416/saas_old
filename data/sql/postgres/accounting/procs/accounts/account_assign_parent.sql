create or replace function account_assign_parent (
    p_client_id clients.clients.id%type,
    p_acct_id accounting.accounts.id%type,
    p_parent_acct_id accounting.accounts.id%type
)
returns void
as $$
begin
    insert into accounting.account_tree (
        client_id,
        acct_id,
        parent_acct_id
    ) values (
        p_client_id,
        p_acct_id,
        p_parent_acct_id
    );
end
$$
language plpgsql;