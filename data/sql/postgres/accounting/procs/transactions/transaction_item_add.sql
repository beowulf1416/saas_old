create or replace function transaction_item_add (
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
    insert into accounting.transaction_items (
        client_id,
        transaction_id,
        id,
        account_id,
        debit,
        credit
    ) values (
        p_client_id,
        p_transaction_id,
        p_transaction_item_id,
        p_account_id,
        p_debit,
        p_credit
    );
end
$$
language plpgsql;