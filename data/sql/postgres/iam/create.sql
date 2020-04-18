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

\ir tables/role_permissions.sql
\ir tables/role_clients.sql
\ir tables/role_users.sql


/* functions */
/* users */
\ir procs/user_add.sql
\ir procs/user_add_google.sql

\ir procs/user_email_exists.sql
\ir procs/user_get_by_email.sql

\ir procs/user_signin.sql

\ir procs/permissions_user_all.sql


set schema 'public';