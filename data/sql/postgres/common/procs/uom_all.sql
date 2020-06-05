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
        b.name dimension,
        a.name,
        a.symbol
    from common.uom a
        inner join common.dimensions b on a.dimension_id = b.id;
end
$$
language plpgsql
stable;