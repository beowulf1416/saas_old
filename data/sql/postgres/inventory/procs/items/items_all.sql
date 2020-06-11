/**
 * retrieve all inventory items
 */
create or replace function items_all (
    p_client_id clients.clients.id%type
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
    length_unit_id inventory.items.length_unit_id%type,
    width items.width%type,
    width_unit_id inventory.items.width_unit_id%type,
    height items.height%type,
    height_unit_id inventory.items.height_unit_id%type,
    weight items.weight%type,
    weight_unit_id inventory.items.weight_unit_id%type,
    perishable items.perishable%type,
    hazardous items.hazardous%type
)
as $$
begin
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
        a.length_unit_id,
        a.width,
        a.width_unit_id,
        a.height,
        a.height_unit_id,
        a.weight,
        a.weight_unit_id,
        a.perishable,
        a.hazardous
    from inventory.items a
    where a.client_id = p_client_id;
end
$$ language plpgsql
stable;