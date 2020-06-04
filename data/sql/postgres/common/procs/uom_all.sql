create or replace function uom_all ()
returns table (
    id common.uom.id%type,
    dimension_id common.uom.dimension_id%type,
    name common.uom.name%type,
    symbol common.uom.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.dimension_id,
        a.name,
        a.symbol
    from common.uom a;
end
$$
language plpgsql
stable;