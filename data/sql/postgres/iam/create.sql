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

set schema 'public';