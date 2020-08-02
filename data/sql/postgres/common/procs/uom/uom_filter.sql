create or replace function uom_filter (
    p_client_id clients.clients.id%type,
    p_dimension varchar(20),
    p_filter common.uom.name%type
)
returns table (
    id common.uom.id%type,
    name common.uom.name%type,
    symbol common.uom.symbol%type,
    dimension_id common.uom.dimension_id%type
)
as $$
begin
    case 
        when p_dimension = 'length' then
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom_length a
            where a.name ilike p_filter;
        when p_dimension = 'area' then
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom_area a
            where a.name ilike p_filter;
        when p_dimension = 'volume' then
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom_volume a
            where a.name ilike p_filter;
        when p_dimension ='weight' then
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom_weight a
            where a.name ilike p_filter;
        when p_dimension = 'quantity' then
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom_quantity a
            where a.name ilike p_filter;
        else
            return query
            select
                a.id,
                a.name,
                a.symbol,
                a.dimension_id
            from common.uom a
            where a.name ilike p_filter;
    end case;
end
$$
language plpgsql
stable;