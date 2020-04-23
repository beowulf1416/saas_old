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
\ir procs/user_add.sql
\ir procs/user_add_google.sql

\ir procs/user_email_exists.sql
\ir procs/user_get_by_email.sql

\ir procs/user_signin.sql

\ir procs/user_clients_all.sql

\ir procs/permissions_user_all.sql

/* roles */
\ir procs/roles/roles_all.sql
\ir procs/roles/role_add.sql


/* init */
-- create system administrator role
do $$
declare
    default_client_id clients.clients.id%type;
    tmp_rid iam.roles.id%type;
begin
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    insert into roles (client_id, name, active) values
    (default_client_id, 'system administrator', true)
    returning id into tmp_rid;

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


set schema 'public';