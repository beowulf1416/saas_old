create or replace function uom_all ()
returns table (
    id common.uom.id%type,
    name common.uom.name%type,
    symbol common.uom.symbol%type,
    dimension_id common.uom.dimension_id%type
)
as $$
begin
    select
        a.id,
        a.name,
        a.symbol,
        a.dimension_id
    from common.uom a;
end
$$
language plpgsql
stable;