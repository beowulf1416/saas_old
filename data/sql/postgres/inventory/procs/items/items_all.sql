/**
 * retrieve all inventory items
 */
create or replace function items_all (
    p_client_id clients.clients.id%type
)
returns table ()
as $$
begin
end
$$ language plpgsql;