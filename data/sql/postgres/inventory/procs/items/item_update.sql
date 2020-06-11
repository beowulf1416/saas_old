/**
 * update an inventory item
 */
create or replace function item_update (
    p_client_id inventory.items.client_id%type,
    p_item_id inventory.items.id%type,
    p_name inventory.items.name%type,
    p_desc inventory.items.description%type,
    p_make inventory.items.make%type,
    p_brand inventory.items.brand%type,
    p_model inventory.items.model%type,
    p_version inventory.items.version%type,
    p_sku inventory.items.sku%type,
    p_upc inventory.items.upc%type,
    p_length inventory.items.length%type,
    p_length_unit_id inventory.items.length_unit_id%type, 
    p_width items.width%type,
    p_width_unit_id inventory.items.width_unit_id%type,
    p_height items.height%type,
    p_height_unit_id inventory.items.height_unit_id%type,
    p_weight items.weight%type,
    p_weight_unit_id inventory.items.weight_unit_id%type,
    p_perishable items.perishable%type,
    p_hazardous items.hazardous%type
)
returns void
as $$
declare
    tmp_id inventory.items.id%type;
begin
    update inventory.items set
        name = p_name,
        description = p_desc,
        make = p_make,
        brand = p_brand,
        model = p_model,
        version = p_version,
        sku = p_sku,
        upc = p_upc,
        length = p_length,
        length_unit_id = p_length_unit_id,
        width = p_width,
        width_unit_id = p_width_unit_id,
        height = p_height,
        height_unit_id = p_height_unit_id,
        weight = p_weight,
        weight_unit_id = p_weight_unit_id,
        perishable = p_perishable,
        hazardous = p_hazardous
    where client_id = p_client_id
        and id = p_item_id; 
end
$$
language plpgsql;