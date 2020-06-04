create or replace function items_add_substitute(
    p_client_id clients.clients.id%type,
    p_item_id inventory.items.id%type,
    p_substitute_item_id inventory.items.id%type
)
returns void
as $$
begin
    insert into inventory.item_substitutes (
        client_id,
        item_id,
        substitute_item_id
    ) values (
        p_client_id,
        p_item_id,
        p_substitute_item_id
    );
end
$$
language plpgsql;