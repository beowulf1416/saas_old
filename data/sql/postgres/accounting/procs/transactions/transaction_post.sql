create or replace function transaction_post (
    p_client_id clients.clients.id%type,
    transaction_id accounting.transactions.id%type
)
returns void
as $$
begin
    update accounting.transactions set 
        posted_ts = now()
    where client_id = p_client_id
        and id = p_transaction_id;

    -- process transaction items
end
$$
language plpgsql;