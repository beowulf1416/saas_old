/**
 * retrieve matching inventory items
 */
create or replace function items_filter (
    p_client_id clients.clients.id%type,
    p_filter inventory.items.name%type,
    p_num_items int,
    p_page int,
    p_total out int
)
returns table (
    id items.id%type,
    active items.active%type,
    name items.name%type,
    description items.description%type,
    make items.make%type,
    brand items.brand%type,
    model items.model%type,
    version items.version%type,
    sku items.sku%type,
    upc items.upc%type
)
as $$
begin
    if p_page > 0 then
        select
            count(*) into p_total
        from inventory.items a
        where a.client_id = p_client_id
            and (
                a.name like p_filter
                or a.description like p_filter    
            );

        return query
        select
            a.id,
            a.name,
            a.description,
            a.make,
            a.brand,
            a.model,
            a.version,
            a.sku,
            a.upc
        from inventory.items a
        where a.client_id = p_client_id
            and (
                a.name like p_filter
                or a.description like p_filter    
            )
        order by a.name
        limit p_num_items
        offset p_page * p_num_items;
    else 
        return query
        select
            a.id,
            a.name,
            a.description,
            a.make,
            a.brand,
            a.model,
            a.version,
            a.sku,
            a.upc
        from inventory.items a
        where a.client_id = p_client_id
            and (
                a.name like p_filter
                or a.description like p_filter    
            )
        order by a.name
        limit p_num_items
        offset p_page * p_num_items;
    end if;
end
$$
language plpgsql
stable;
