/**
 * client management
 */
create schema if not exists clients;
set schema 'clients';


\echo '** CLIENTS **'

/** tables **/
\ir tables/clients.sql
\ir tables/organizations.sql
\ir tables/org_tree.sql


set schema 'public';