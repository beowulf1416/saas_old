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
    t_client_id clients.clients.id%type;
    t_role_id iam.roles.id%type;
    t_permission_id iam.permissions.id%type;
begin
    insert into clients.clients (
        name, 
        address
    ) values (
        p_name,
        p_addr
    )
    returning id into t_client_id;

    -- create default role for client
    select 
        a into t_role_id
    from iam.role_add(t_client_id, 'everyone') a;
    perform * from iam.role_set_active(t_role_id, true);

    -- assign user.authenticated permission
    select
        a.id into t_permission_id
    from iam.permissions a
    where a.name = 'user.authenticated';
    perform * from iam.permissions_role_assign(t_client_id,t_role_id, t_permission_id);

    -- create root organization for client
    insert into clients.organizations (
        client_id,
        name,
        description
    ) values (
        t_client_id,
        'root',
        'root organization'
    );

    -- create root accounting account for client
    insert into accounting.accounts (client_id, type_id, name, description) values
    (t_client_id, 0, 'root', 'root account');

    return t_client_id;
end
$$
language plpgsql;