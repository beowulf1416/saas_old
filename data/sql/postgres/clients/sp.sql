/**
 * client management
 */
set schema 'clients';

/** clients **/
\ir procs/clients/client_add.sql
\ir procs/clients/clients_all.sql
\ir procs/clients/clients_get.sql
\ir procs/clients/client_default.sql
\ir procs/clients/client_set_active.sql
\ir procs/clients/clients_filter.sql
\ir procs/clients/client_update.sql
\ir procs/clients/client_by_name.sql

/** organizations **/
\ir procs/organizations/organization_add.sql
\ir procs/organizations/organization_update.sql
\ir procs/organizations/organization_get.sql
\ir procs/organizations/organization_set_parent.sql
\ir procs/organizations/organization_root.sql
\ir procs/organizations/organization_set_parent.sql
\ir procs/organizations/organizations_tree_all.sql


set schema 'public';