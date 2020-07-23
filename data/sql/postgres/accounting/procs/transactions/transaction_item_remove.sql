create or replace function transaction_item_remove (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_transaction_item_id accounting.transaction_items.id%type
)
returns void
as $$
begin
    delete from accounting.transaction_items
    where client_id = p_client_id
        and transaction_id = p_transaction_id
        and id = p_transaction_item_id;
end
$$
language plpgsql;