/**
 * identity and access management
 */
create schema if not exists iam;
set schema 'iam';


/* tables */
\ir tables/users.sql
\ir tables/users_google.sql

\ir tables/permissions.sql
\ir tables/roles.sql

\ir tables/user_clients.sql

\ir tables/role_permissions.sql
\ir tables/role_users.sql


/* functions */
/* users */
\ir procs/users/user_add.sql
\ir procs/users/user_add_google.sql
\ir procs/users/user_set_active.sql

\ir procs/users/user_email_exists.sql
\ir procs/users/user_get_by_email.sql

\ir procs/users/user_signin.sql

\ir procs/users/user_clients_all.sql
\ir procs/users/client_users_all.sql
\ir procs/users/client_user_add.sql
\ir procs/users/client_user_remove.sql

\ir procs/users/user_has_permission.sql

/* permissions */
\ir procs/permissions/permissions_all.sql
\ir procs/permissions/permissions_role.sql
\ir procs/permissions/permissions_role_assign.sql
\ir procs/permissions/permissions_role_revoke.sql
\ir procs/permissions/permission_set_active.sql
\ir procs/permissions/permissions_user_all.sql


/* roles */
\ir procs/roles/roles_all.sql
\ir procs/roles/role_add.sql
\ir procs/roles/role_set_active.sql
\ir procs/roles/client_roles_all.sql
\ir procs/roles/client_user_roles.sql
\ir procs/roles/role_assign_user.sql
\ir procs/roles/role_remove_user.sql


/* init */
-- create system administrator role
do $$
declare
    default_client_id clients.clients.id%type;
    tmp_rid iam.roles.id%type;
begin
    -- get default client
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    -- create sysadmin role
    insert into iam.roles (client_id, name, active) values
    (default_client_id, 'system administrator', true)
    on conflict do nothing;

    select 
        a.id into tmp_rid
    from iam.roles a
    where a.client_id = default_client_id;

    -- give all permissions to sysad role
    insert into iam.role_permissions (role_id, permission_id, client_id)
    select 
        tmp_rid,
        a.id,
        default_client_id
    from iam.permissions a
    on conflict do nothing;
end
$$
language plpgsql;


-- create default role for default client
do $$
declare
    default_client_id clients.clients.id%type;
    tmp_rid iam.roles.id%type;
    tmp_pid iam.permissions.id%type;
begin
    -- get default client
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    --create everyone role
    insert into iam.roles (client_id, name, active) values
    (default_client_id, 'everyone', true)
    on conflict do nothing;

    select 
        a.id into tmp_rid
    from iam.roles a
    where a.name = 'everyone';

    -- retrieve user.authenticated permission id
    select
        a.id into tmp_pid
    from iam.permissions a
    where a.name = 'user.authenticated';

    -- assign permission to everyone role
    insert into iam.role_permissions (client_id, role_id, permission_id)
    values (default_client_id, tmp_rid, tmp_pid)
    on conflict do nothing;
end
$$
language plpgsql;

set schema 'public';