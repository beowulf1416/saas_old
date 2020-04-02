/**
 * identity and access management
 */
create schema if not exists iam;
set schema 'iam';


/* tables */
\ir tables/users.sql
\ir tables/users_google.sql


/* functions */
/* users */
\ir procs/user_add.sql

\ir procs/user_get_by_email.sql


set schema 'public';