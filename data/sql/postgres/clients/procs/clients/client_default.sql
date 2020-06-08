/**
 * retrieve default client
 */
create or replace function client_default ()
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
    where a.name = 'default';
end
$$ language plpgsql;