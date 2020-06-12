create or replace function item_component_add (
    p_client_id clients.clients.id%type,
    p_item_id inventory.items.id%type,
    p_component_id inventory.items.id%type,
    p_quantity inventory.item_components.quantity%type,
    p_dimension_id inventory.item_components.dimension_id%type,
    p_unit_id inventory.item_components.unit_id%type
)
returns void
as $$
begin
    insert into inventory.item_components (
        client_id,
        item_id,
        component_item_id,
        quantity,
        dimension_id,
        unit_id
    ) values (
        p_client_id,
        p_item_id,
        p_component_id,
        p_quantity,
        p_dimension_id,
        p_unit_id
    )
    on conflict (client_id, item_id, component_item_id)
    do update set 
        quantity = excluded.quantity,
        dimension_id = excluded.dimension_id,
        unit_id = excluded.unit_id;
end
$$
language plpgsql
;