/**
 * add an inventory item
 */
create or replace function item_add (
    p_client_id items.client_id%type,
    p_name items.name%type,
    p_desc items.description%type,
    p_make items.make%type,
    p_brand items.brand%type,
    p_model items.model%type,
    p_version items.version%type,
    p_sku items.sku%type,
    p_length items.length%type,
    p_width items.width%type,
    p_height items.height%type,
    p_weight items.weight%type,
    p_perishable items.perishable%type,
    p_hazardous items.hazardous%type
)
returns items.id%type
as $$
declare
    tmp_id items.id%type;
begin
    insert into items (
        client_id,
        name,
        description,
        make,
        brand,
        model,
        version,
        sku,
        length,
        width,
        height,
        weight,
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
        p_length,
        p_width,
        p_height,
        p_weight,
        p_perishable,
        p_hazardous
    )
    returning id into tmp_id;
    
    return tmp_id;
end
$$
language plpgsql;