/**
 * human resource management
 */
create schema if not exists hr;
set schema 'hr';

\echo '** HR **'

/** tables **/
\ir tables/employees.sql
\ir tables/employee_user.sql



/** functions **/



set schema 'public';