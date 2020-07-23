create or replace function transaction_get (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type
)
returns table (
    transaction_id accounting.transactions.id%type,
    currency_id common.currencies.id%type,
    description accounting.transactions.description%type,
    created_ts timestamp without time zone,
    posted_ts timestamp without time zone
)
as $$
begin
    select
        a.id,
        a.currency_id,
        a.description,
        a.created_ts,
        a.posted_ts
    from accounting.transactions a
    where a.client_id = p_client_id
        and a.id = p_transaction_id;
end
$$
language plpgsql
stable;