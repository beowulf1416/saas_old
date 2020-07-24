create or replace function currency_get (
    p_currency_id common.currencies.id%type
)
returns table (
    currency_id common.currencies.id%type,
    name common.currencies.name%type,
    currency common.currencies.currency%type,
    symbol common.currencies.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.currency,
        a.symbol
    from common.currencies a
    where a.id = p_currency_id;
end
$$
language plpgsql
stable;