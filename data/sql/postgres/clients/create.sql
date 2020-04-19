/**
 * client management
 */
create schema if not exists clients;
set schema 'clients';


/** tables **/
\ir tables/clients.sql


/** functions **/
\ir procs/clients_all.sql
\ir procs/clients_get.sql


set schema 'public';