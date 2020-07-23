/**
 * retrieve default client
 */
create or replace function client_default ()
returns table (
    id clients.clients.id%type,
    active clients.clients.active%type,
    name clients.clients.name%type,
    address clients.clients.address%type,
    country_id clients.clients.country_id%type,
    currency_id clients.clients.currency_id%type
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
    where a.name = 'default';
end
$$ 
language plpgsql
stable;