/**
 * add a client
 */
create or replace function client_add (
    p_client_id clients.clients.id%type,
    p_name clients.clients.name%type,
    p_addr clients.clients.address%type,
    p_country_id clients.clients.country_id%type
)
returns void
as $$
declare
    t_role_id iam.roles.id%type;
    t_permission_id iam.permissions.id%type;
begin
    insert into clients.clients (
        id,
        name, 
        address,
        country_id
    ) values (
        p_client_id,
        p_name,
        p_addr,
        p_country_id
    );

    -- create default role for client
    t_role_id := public.gen_random_uuid();
    perform * from iam.role_add(p_client_id, t_role_id, 'everyone');
    perform * from iam.role_set_active(t_role_id, true);

    -- assign user.authenticated permission
    select
        a.id into t_permission_id
    from iam.permissions a
    where a.name = 'user.authenticated';
    perform * from iam.permissions_role_assign(p_client_id,t_role_id, t_permission_id);

    -- create root organization for client
    insert into clients.organizations (
        client_id,
        name,
        description
    ) values (
        p_client_id,
        'root',
        'root organization'
    );

    -- create root accounting account for client
    insert into accounting.accounts (client_id, type_id, name, description) values
    (p_client_id, 0, 'root', 'root account');
end
$$
language plpgsql;