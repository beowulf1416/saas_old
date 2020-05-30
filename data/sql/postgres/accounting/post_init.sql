/**
 * initialize accounting schema
 */


-- create root account for default client
do $$
declare
    default_client_id clients.clients.id%type;
begin
    -- get default client
    select
        a.id into default_client_id
    from clients.client_default() a;

    -- insert into accounting.accounts (client_id, type_id, name, description) values
    -- (default_client_id, 0, 'root', 'root account');
end
$$
language plpgsql;