/**
 * identity and access management
 */
set schema 'iam';


/* functions */
/* users */
\ir procs/users/user_add.sql
\ir procs/users/user_add_google.sql
\ir procs/users/user_set_active.sql

\ir procs/users/user_email_exists.sql
\ir procs/users/user_get_by_email.sql
\ir procs/users/users_filter.sql

\ir procs/users/user_signin.sql

\ir procs/users/user_clients_all.sql
\ir procs/users/client_users_all.sql
\ir procs/users/client_user_add.sql
\ir procs/users/client_user_remove.sql
\ir procs/users/client_user_set_active.sql
\ir procs/users/client_user_permissions.sql
\ir procs/users/client_user_join.sql

\ir procs/users/user_has_permission.sql

/* permissions */
\ir procs/permissions/permissions_all.sql
\ir procs/permissions/permissions_filter.sql
\ir procs/permissions/permissions_role.sql
\ir procs/permissions/permissions_role_assign.sql
\ir procs/permissions/permissions_role_revoke.sql
\ir procs/permissions/permission_set_active.sql
\ir procs/permissions/permissions_user_all.sql


/* roles */
\ir procs/roles/roles_all.sql
\ir procs/roles/role_by_name.sql
\ir procs/roles/role_add.sql
\ir procs/roles/role_set_active.sql
\ir procs/roles/client_roles_all.sql
\ir procs/roles/clients_roles_filter.sql
\ir procs/roles/client_user_roles.sql
\ir procs/roles/role_assign_user.sql
\ir procs/roles/role_remove_user.sql


set schema 'public';