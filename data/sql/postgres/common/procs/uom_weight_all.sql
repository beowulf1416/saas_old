create or replace function uom_weight_all ()
returns table (
    id common.uom_weight.id%type,
    name common.uom_weight.name%type,
    symbol common.uom_weight.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.symbol
    from common.uom_weight a
end
$$
language plpgsql
stable;