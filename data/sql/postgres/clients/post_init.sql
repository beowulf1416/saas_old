/**
 * initialize clients schema
 */

do $$
declare
    client_id clients.clients.id%type;
begin
    -- create default client
    select
        a into client_id
    from clients.client_add('default', 'N/A') a;
    
    perform * from clients.client_set_active(client_id, true);
end
$$
language plpgsql;