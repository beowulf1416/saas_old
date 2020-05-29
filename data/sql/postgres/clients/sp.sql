/**
 * client management
 */
set schema 'clients';

/** clients **/
\ir procs/clients/client_add.sql
\ir procs/clients/clients_all.sql
\ir procs/clients/clients_get.sql
\ir procs/clients/client_by_url_name.sql
\ir procs/clients/client_default.sql
\ir procs/clients/client_set_active.sql

/** organizations **/
\ir procs/organizations/organization_add.sql
\ir procs/organizations/organization_set_parent.sql


set schema 'public';