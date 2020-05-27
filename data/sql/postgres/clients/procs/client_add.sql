/**
 * add a client
 */
create or replace function client_add (
    p_name clients.clients.name%type,
    p_addr clients.clients.address%type,
    p_url clients.clients.url_name%type
)
returns clients.clients.id%type
as $$
declare
    t_client_id clients.clients.id%type;
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
    returning id into t_client_id;

    -- create default role for client
    insert into iam.roles (client_id, name) values (
        t_client_id, 'everyone'
    );

    -- create root accounting account for client
    insert into accounting.accounts values (client_id, type_id, name, description) values
    (t_client_id, 0, 'root', 'root account');
    ()

    return t_client_id;
end
$$
language plpgsql;