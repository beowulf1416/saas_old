/**
 * add an inventory item
 */
create or replace function item_add (
    p_client_id inventory.items.client_id%type,
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
    p_width inventory.items.width%type,
    p_width_unit_id inventory.items.width_unit_id%type,
    p_height items.height%type,
    p_height_unit_id inventory.items.height_unit_id%type,
    p_weight items.weight%type,
    p_weight_unit_id inventory.items.weight_unit_id%type,
    p_perishable items.perishable%type,
    p_hazardous items.hazardous%type
)
returns inventory.items.id%type
as $$
declare
    tmp_id inventory.items.id%type;
begin
    insert into inventory.items (
        client_id,
        name,
        description,
        make,
        brand,
        model,
        version,
        sku,
        upc,
        length,
        length_unit_id,
        width,
        width_unit_id,
        height,
        height_unit_id,
        weight,
        weight_unit_id,
        perishable,
        hazardous
    ) values (
        p_client_id,
        p_name,
        p_desc,
        p_make,
        p_brand,
        p_model,
        p_version,
        p_sku,
        p_upc,
        p_length,
        p_length_unit_id,
        p_width,
        p_width_unit_id,
        p_height,
        p_height_unit_id,
        p_weight,
        p_weight_unit_id,
        p_perishable,
        p_hazardous
    )
    returning id into tmp_id;
    
    return tmp_id;
end
$$
language plpgsql;