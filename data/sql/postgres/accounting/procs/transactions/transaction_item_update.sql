create or replace function transaction_item_update (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_transaction_item_id accounting.transaction_items.id%type,
    p_account_id accounting.accounts.id%type,
    p_debit accounting.transaction_items.debit%type,
    p_credit accounting.transaction_items.credit%type
)
returns void
as $$
begin
    update accounting.transaction_items set
        account_id = p_account_id,
        debit = p_debit,
        credit = p_credit
    where client_id = p_client_id
        and transaction_id = p_transaction_id
        and id = p_transaction_item_id;
end
$$
language plpgsql;