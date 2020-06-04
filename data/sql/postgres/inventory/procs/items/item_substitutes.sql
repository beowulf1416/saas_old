create or replace function item_substitutes (
    p_client_id clients.clients.id%type,
    p_item_id inventory.items.id%type
)
returns table (
    id inventory.items.id%type,
    active inventory.items.active%type,
    name inventory.items.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name
    from inventory.items a
    where a.client_id = p_client_id
        and a.id = p_item_id;
end
$$
language plpgsql
stable;