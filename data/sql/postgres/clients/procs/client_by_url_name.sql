/**
 * get client by url name
 */
create or replace function client_by_url_name(
    p_url clients.clients.url_name%type
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
    return query
    select
        a.id,
        a.active,
        a.name,
        a.address,
        a.url_name
    from clients.clients a
    where a.url_name = p_url;
end
$$
language plpgsql;