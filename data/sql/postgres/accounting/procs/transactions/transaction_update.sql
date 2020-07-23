create or replace function transaction_update (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_currency_id accounting.transactions.currency_id%type,
    p_description accounting.transactions.description%type
)
returns void
as $$
begin
    update accounting.transactions set 
        currency_id = p_currency_id,
        description = p_description
    where client_id = p_client_id
        and id = p_transaction_id;
end
$$
language plpgsql;