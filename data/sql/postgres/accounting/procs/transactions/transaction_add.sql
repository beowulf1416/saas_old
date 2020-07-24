create or replace function transaction_add (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_currency_id accounting.transactions.currency_id%type,
    p_description accounting.transactions.description%type
)
returns void
as $$
begin
    insert into accounting.transactions (
        client_id,
        id,
        currency_id,
        description
    ) values (
        p_client_id,
        p_transaction_id,
        p_currency_id,
        p_description
    );
end
$$
language plpgsql;