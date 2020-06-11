create or replace function uom_area_all ()
returns table (
    id common.uom_area.id%type,
    name common.uom_area.name%type,
    symbol common.uom_area.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.symbol
    from common.uom_area a;
end
$$
language plpgsql
stable;