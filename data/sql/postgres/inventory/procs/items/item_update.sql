/**
 * update an inventory item
 */
create or replace function item_update (
    p_client_id items.client_id%type,
    p_item_id items.id%type,
    p_name items.name%type,
    p_desc items.description%type,
    p_make items.make%type,
    p_brand items.brand%type,
    p_model items.model%type,
    p_version items.version%type,
    p_sku items.sku%type,
    p_upc items.upc%type,
    p_length items.length%type,
    p_width items.width%type,
    p_height items.height%type,
    p_weight items.weight%type,
    p_perishable items.perishable%type,
    p_hazardous items.hazardous%type
)
returns void
as $$
declare
    tmp_id items.id%type;
begin
    update items set
        name = p_name,
        description = p_desc,
        make = p_make,
        brand = p_brand,
        model = p_model,
        version = p_version,
        sku = p_sku,
        upc = p_upc,
        length = p_length,
        width = p_width,
        height = p_height,
        weight = p_weight,
        perishable = p_perishable,
        hazardous = p_hazardous
    where client_id = p_client_id
        and item_id = p_item_id; 
end
$$
language plpgsql;