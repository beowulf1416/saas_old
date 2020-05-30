/**
 * initialize iam schema
 */

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
    perform * from iam.role_set_active(t_sysad_role_id, true);

    -- give all permissions to sysad role
    insert into iam.role_permissions (role_id, permission_id, client_id)
    select 
        t_sysad_role_id,
        a.id,
        default_client_id
    from iam.permissions a
    on conflict do nothing;  
end
$$
language plpgsql;