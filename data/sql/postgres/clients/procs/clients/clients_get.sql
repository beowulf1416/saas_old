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
    country_id clients.clients.country_id%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.address,
        a.country_id
    from clients.clients a
    where a.id = p_client_id;
end
$$
language plpgsql
stable;