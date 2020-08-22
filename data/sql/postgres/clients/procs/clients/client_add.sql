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
    t_permission_id_user_auth iam.permissions.id%type;
    r_permissions iam.permissions%rowtype; 
    -- t_permission_id_client_admin iam.permissions.id%type;
    -- t_permission_id_client_info iam.permissions.id%type;
    t_account_group_root_id accounting.account_groups.id%type;
    t_account_group_id accounting.account_groups.id%type;
    t_account_types record;
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

    -- create 'everyone' role for client
    t_role_id := public.gen_random_uuid();
    perform * from iam.role_add(p_client_id, t_role_id, 'everyone');
    perform * from iam.role_set_active(t_role_id, true);

    -- assign user.authenticated permission to 'everyone' role
    select
        a.id into t_permission_id_user_auth
    from iam.permissions a
    where a.name = 'user.authenticated';
    perform * from iam.permissions_role_assign(
        p_client_id, 
        t_role_id, 
        t_permission_id_user_auth
    );

    -- create 'admin' role for client
    t_role_id := public.gen_random_uuid();
    perform * from iam.role_add(p_client_id, t_role_id, 'administrator');
    perform * from iam.role_set_active(t_role_id, true);

    -- assign user.authenticated, client.admin, client.info, clients.admin.active 
    -- permissions to 'admin' role
    for r_permissions in 
        select a.*
        from iam.permissions a
        where a.name in (
            'user.authenticated',
            'clients.admin',
            'client.info',
            'clients.info.update',
            'clients.organizations.add',
            'clients.organizations.update',
            'client.admin.active'
        )
    loop
        perform * from iam.permissions_role_assign(
            p_client_id,
            t_role_id,
            r_permissions.id
        );
    end loop;

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
    t_account_group_root_id := public.gen_random_uuid();
    insert into accounting.account_groups (
        client_id,
        id,
        type_id,
        name,
        description
    ) values (
        p_client_id, 
        t_account_group_root_id,
        -- root account type
        0,
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
        t_account_group_root_id,
        t_account_group_root_id,
        text2ltree('root')
    );

    -- create default accounting groups for client
    for t_account_types in select * from accounting.account_types where name <> 'root' loop
        t_account_group_id := public.gen_random_uuid();
        insert into accounting.account_groups (
            client_id,
            id,
            type_id,
            name,
            description
        ) values (
            p_client_id, 
            t_account_group_id,
            t_account_types.id, 
            t_account_types.name, 
            'root account group - ' || t_account_types.name
        );

        insert into accounting.account_group_tree (
            client_id,
            group_id,
            parent_group_id,
            path
        ) values (
            p_client_id,
            t_account_group_id,
            t_account_group_root_id,
            text2ltree('root.' || t_account_types.name)
        );
    end loop;

    
end
$$
language plpgsql;