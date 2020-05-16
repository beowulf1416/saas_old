/**
 * retrieve all inventory categories for a client
 */
create or replace function categories_all (
    p_client_id clients.clients.id%type
)
returns table (
    name inventory.categories.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name
    from inventory.categories a
    where a.client_id = p_client_id;
end
$$ language plpgsql;