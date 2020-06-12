create or replace function item_components (
    p_client_id clients.clients.id%type,
    p_item_id inventory.items.id%type
)
returns table (
    id inventory.items.id%type,
    name inventory.items.name%type,
    quantity inventory.item_components.quantity%type,
    dimension_id inventory.item_components.dimension_id%type,
    unit_id inventory.item_components.unit_id%type
)
as $$
begin
    return query
    select
        a.component_item_id,
        b.name,
        a.quantity,
        a.dimension_id,
        a.unit_id
    from inventory.item_components a
        inner join inventory.items b on a.component_item_id = b.id
    where a.client_id = p_client_id
        and b.client_id = p_client_id;
end
$$
language plpgsql
stable;