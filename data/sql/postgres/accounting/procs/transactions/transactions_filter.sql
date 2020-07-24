create or replace function transactions_filter (
    p_client_id clients.clients.id%type,
    p_filter accounting.transactions.description%type
)
returns table (
    transaction_id accounting.transactions.id%type,
    created_ts accounting.transactions.created_ts%type,
    posted_ts accounting.transactions.posted_ts%type,
    currency_id accounting.transactions.currency_id%type,
    description accounting.transactions.description%type
)
as $$
begin
    return query
    select
        a.id,
        a.created_ts,
        a.posted_ts,
        a.currency_id,
        a.description
    from accounting.transactions a
    where a.client_id = p_client_id
        and a.description ilike p_filter;
end
$$
language plpgsql
stable;