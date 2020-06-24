/**
 * human resource management
 */
create schema if not exists hr;
set schema 'hr';

\echo '** HR **'

/** tables **/
\ir tables/employee_id_types.sql

\ir tables/employees.sql
\ir tables/employee_user.sql
\ir tables/employee_orgs.sql
\ir tables/employee_ids.sql

\ir tables/shifts.sql


set schema 'public';