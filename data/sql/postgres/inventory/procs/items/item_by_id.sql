/**
 * get item by id
 */
create or replace function item_by_id (
    p_item_id inventory.items.id%type
)
returns table (
    id inventory.items.id%type,
    active inventory.items.active%type,
    created_ts inventory.items.created_ts%type,
    client_id inventory.items.client_id%type,
    name inventory.items.name%type,
    description inventory.items.description%type,
    make inventory.items.make%type,
    brand inventory.items.brand%type,
    model inventory.items.model%type,
    version inventory.items.version%type,
    sku inventory.items.sku%type,
    upc inventory.items.upc%type,
    length inventory.items.length%type,
    length_unit_id inventory.items.length_unit_id%type,
    width inventory.items.width%type,
    width_unit_id inventory.items.width_unit_id%type,
    height inventory.items.height%type,
    height_unit_id inventory.items.height_unit_id%type,
    weight inventory.items.weight%type,
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
    where a.id = p_item_id;
end
$$ language plpgsql;