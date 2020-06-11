create or replace function uom_volume_all ()
returns table (
    id common.uom_volume.id%type,
    name common.uom_volume.name%type,
    symbol common.uom_volume.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.symbol
    from common.uom_volume a
end
$$
language plpgsql
stable;