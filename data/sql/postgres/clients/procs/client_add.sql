/**
 * add a client
 */
create or replace function client_add (
    p_name clients.clients.name%type,
    p_addr clients.clients.address%type,
    p_url clients.clients.url_name%type,
)
returns clients.clients.id%type
as $$
declare
    tmp_id clients.clients.id%type;
begin
    insert into clients.clients (
        name, 
        address,
        url_name
    ) values (
        p_name,
        p_addr,
        p_url
    )
    returning id into tmp_id;

    return tmp_id;
end
$$
language plpgsql;