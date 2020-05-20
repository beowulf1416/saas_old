/**
 * retrieve a specific client
 */
create or replace function clients_get (
    p_client_id clients.clients.id%type
)
returns table (
    id clients.clients.id%type,
    active clients.clients.active%type,
    name clients.clients.name%type,
    address clients.clients.address%type,
    url_name clients.clients.url_name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.address,
        a.url_name
    from clients.clients a
    where a.id = p_client_id;
end
$$
language plpgsql;