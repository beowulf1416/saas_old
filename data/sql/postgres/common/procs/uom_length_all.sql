create or replace function uom_length_all ()
returns table (
    id common.uom_length.id%type,
    name common.uom_length.name%type,
    symbol common.uom_length.symbol%type
)
as $$
begin
    return query
    select
        a.id,
        a.name,
        a.symbol
    from common.uom_length a;
end
$$
language plpgsql
stable;