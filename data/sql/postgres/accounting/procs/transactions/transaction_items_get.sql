create or replace function transaction_items_get (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type
)
returns table (
    transaction_item_id accounting.transaction_items.id%type,
    account_id accounting.transaction_items.account_id%type,
    debit accounting.transaction_items.debit%type,
    credit accounting.transaction_items.credit%type
)
as $$
begin
    return query
    select
        a.id,
        a.account_id,
        a.debit,
        a.credit
    from accounting.transaction_items a
    where a.client_id = p_client_id
        and a.transaction_id = p_transaction_id;
end
$$
language plpgsql
stable;