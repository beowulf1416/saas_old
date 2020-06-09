create or replace function client_update (
    p_client_id clients.clients.id%type,
    p_name clients.clients.name%type,
    p_address clients.clients.address%type
)
returns void
as $$
begin
    update clients.clients set 
        name = p_name,
        address = p_address
    where id = p_client_id;
end
$$
language plpgsql;