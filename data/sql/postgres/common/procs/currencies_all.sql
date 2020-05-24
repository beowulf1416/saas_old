create or replace function currencies_all ()
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
    from common.currencies a;
end
$$
language plpgsql;