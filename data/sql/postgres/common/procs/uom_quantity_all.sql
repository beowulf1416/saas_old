create or replace function uom_quantity_all ()
returns table (
    id common.uom_quantity.id%type,
    name common.uom_quantity.name%type,
    symbol common.uom_quantity.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.symbol
    from common.uom_quantity a;
end
$$
language plpgsql
stable;