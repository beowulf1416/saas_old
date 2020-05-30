/**
 * initialize iam schema
 */

-- permissions
insert into iam.permissions (name) values
('user.authenticated'),
('admin.clients'),
('admin.security.permissions'),
('admin.security.roles'),
('admin.security.users'),
('clients.admin'),
('clients.admin.users'),
('clients.admin.roles'),
('accounting.dashboard'),
('accounting.admin'),
('inventory.admin'),
('inventory.dashboard'),
('inventory.items'),
('inventory.transactions.receiving'),
('inventory.transactions.receiving.add')
on conflict do nothing;


/* init */
-- create system administrator role
do $$
declare
    default_client_id clients.clients.id%type;
    t_sysad_role_id iam.roles.id%type;
    t_everyone_role_id iam.roles.id%type;
    t_default_permission_id iam.permissions.id%type;
begin
    -- get default client
    select
        a.id into default_client_id
    from clients.client_default() a;

    -- create sysadmin role
    select
        a into t_sysad_role_id
    from iam.role_add(default_client_id, 'system administrator') a;

    -- give all permissions to sysad role
    insert into iam.role_permissions (role_id, permission_id, client_id)
    select 
        t_sysad_role_id,
        a.id,
        default_client_id
    from iam.permissions a
    on conflict do nothing;

    -- create everyone role
    -- select
    --     a into t_everyone_role_id
    -- from iam.role_add(default_client_id, 'everyone') a;

    -- retrieve user.authenticated permission id
    select
        a.id into t_default_permission_id
    from iam.permissions a
    where a.name = 'user.authenticated';

    -- assign permission to role
    -- perform * from iam.permissions_role_assign(default_client_id, t_everyone_role_id, t_default_permission_id);    
end
$$
language plpgsql;