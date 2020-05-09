/**
 * retrieve items matching a filter
 */
create or replace function items_by_name (
    p_client_id clients.clients.id%type,
    p_name inventory.items.name%type
)
returns table (
    id items.id%type,
    active items.active%type,
    created_ts items.created_ts%type,
    client_id items.client_id%type,
    name items.name%type,
    description items.description%type,
    make items.make%type,
    brand items.brand%type,
    model items.model%type,
    version items.version%type,
    sku items.sku%type,
    upc items.upc%type,
    length items.length%type,
    width items.width%type,
    height items.height%type,
    weight items.weight%type,
    perishable items.perishable%type,
    hazardous items.hazardous%type
)
as $$
declare
    tmp_filter inventory.items.name%type;
begin
    select
        concat('%', p_name, '%') into tmp_filter;

    return query
    select
        a.id,
        a.active,
        a.created_ts,
        a.client_id,
        a.name,
        a.description,
        a.make,
        a.brand,
        a.model,
        a.version,
        a.sku,
        a.upc,
        a.length,
        a.width,
        a.height,
        a.weight,
        a.perishable,
        a.hazardous
    from inventory.items a
    where a.client_id = p_client_id
        and a.name like tmp_filter;
end
$$ language plpgsql;