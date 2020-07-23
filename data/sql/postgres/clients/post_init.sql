/**
 * initialize clients schema
 */

do $$
declare
    client_id clients.clients.id%type;
begin
    -- create default client
    client_id := public.gen_random_uuid();
    perform
        *
    from clients.client_add(
        client_id,
        'default', 
        'N/A', 
        608,
        108
    );
    
    perform * from clients.client_set_active(client_id, true);
end
$$
language plpgsql;