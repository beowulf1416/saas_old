/**
 * retrieve all clients
 */
create or replace function clients_filter (
    p_filter clients.clients.name%type
)
returns table (
    id clients.clients.id%type,
    active clients.clients.active%type,
    name clients.clients.name%type,
    address clients.clients.address%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name,
        a.address
    from clients.clients a
    where a.name like p_filter;
end
$$
language plpgsql
stable;