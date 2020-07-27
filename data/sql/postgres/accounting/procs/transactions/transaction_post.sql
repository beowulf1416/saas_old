create or replace function transaction_post (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type
)
returns void
as $$
declare
    t_items record;
begin
    update accounting.transactions set 
        posted_ts = now()
    where client_id = p_client_id
        and id = p_transaction_id
        and posted_ts is null;

    -- process transaction items
    update accounting.account_balances ab
        set value = value + debit - credit,
            updated_ts = now()
    from accounting.transaction_items ti
    where ti.account_id = ab.acct_id
        and ti.client_id = ab.client_id
        and ti.transaction_id = p_transaction_id
        and ti.client_id = p_client_id;
end
$$
language plpgsql;