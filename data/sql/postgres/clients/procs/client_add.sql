/**
 * add a client
 */
create or replace function client_add (
    p_name clients.clients.name%type,
    p_addr clients.clients.address%type
)
returns clients.clients.id%type
as $$
declare
    tmp_id clients.clients.id%type;
begin
    insert into clients.clients (
        name, 
        address
    ) values (
        p_name,
        p_addr
    )
    returning id into tmp_id;

    return tmp_id;
end
$$
language plpgsql;