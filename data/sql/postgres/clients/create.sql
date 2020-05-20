/**
 * client management
 */
create schema if not exists clients;
set schema 'clients';


/** tables **/
\ir tables/clients.sql


/** functions **/
\ir procs/client_add.sql
\ir procs/clients_all.sql
\ir procs/clients_get.sql
\ir procs/client_by_url_name.sql
\ir procs/client_default.sql
\ir procs/client_set_active.sql


set schema 'public';