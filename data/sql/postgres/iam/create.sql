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
    where a.client_id = default_client_id
        and a.name = 'system administrator';

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