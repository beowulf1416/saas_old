create or replace function item_substitutes (
    p_client_id clients.clients.id%type,
    p_item_id inventory.items.id%type
)
returns table (
    id inventory.items.id%type,
    active inventory.items.active%type,
    name inventory.items.name%type,
    sku inventory.items.sku%type,
    upc inventory.items.upc%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.sku,
        a.upc
    from inventory.items a
        inner join inventory.item_substitutes b on a.id = b.substitute_item_id
    where a.client_id = p_client_id
        and b.item_id = p_item_id;
end
$$
language plpgsql
stable;