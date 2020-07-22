create or replace function currencies_filter (
    p_filter common.currencies.name%type
)
returns table (
    id int,
    name varchar(100),
    currency varchar(10),
    symbol varchar(5)
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
    where a.name like p_filter;
end
$$
language plpgsql
stable;