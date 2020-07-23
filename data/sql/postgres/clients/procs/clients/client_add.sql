/**
 * add a client
 */
create or replace function client_add (
    p_client_id clients.clients.id%type,
    p_name clients.clients.name%type,
    p_addr clients.clients.address%type,
    p_country_id clients.clients.country_id%type,
    p_currency_id clients.clients.currency_id%type
)
returns void
as $$
declare
    t_role_id iam.roles.id%type;
    t_permission_id iam.permissions.id%type;
    t_account_group_id accounting.account_groups.id%type;
begin
    insert into clients.clients (
        id,
        name, 
        address,
        country_id,
        currency_id
    ) values (
        p_client_id,
        p_name,
        p_addr,
        p_country_id,
        p_currency_id
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

    -- create root accounting account group for client
    t_account_group_id := public.gen_random_uuid();
    insert into accounting.account_groups (
        client_id,
        id,
        name,
        description
    ) values (
        p_client_id, 
        t_account_group_id, 
        'root', 
        'root account group'
    );

    insert into accounting.account_group_tree (
        client_id,
        group_id,
        parent_group_id,
        path
    ) values (
        p_client_id,
        t_account_group_id,
        t_account_group_id,
        text2ltree('root')
    );
end
$$
language plpgsql;