/**
 * customer relations management
 */
set schema 'crm';

\ir procs/ids/id_types_all.sql

\ir procs/people/people_add.sql
\ir procs/people/people_save.sql
\ir procs/people/people_save_id.sql
\ir procs/people/people_remove_ids.sql
\ir procs/people/people_ids_all.sql

\ir procs/organizations/organization_save.sql
\ir procs/organizations/organization_filter.sql
\ir procs/organizations/organization_get.sql


set schema 'public';