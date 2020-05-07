/**
 * update client active status
 */
create or replace function client_set_active (
    p_client_id clients.clients.id%type,
    p_active clients.clients.active%type
)
returns void
as $$
begin
    update clients.clients set
        active = p_active
    where id = p_client_id;
end
$$ language plpgsql;